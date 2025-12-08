import { reactive, computed, toRaw } from 'vue'
import { defineStore } from 'pinia'
import { getVideoScheduleRequest } from '@/services/api/VideoDataServices'
import { VideoListModel } from './models/VideoListModel'

import type { Video } from '@/types'

type storeVideos = {
  isLoading: boolean
  error?: Error | null
  list?: Record<Video['id'], Video>
}

export const useVideoListStore = defineStore('videoList', () => {
  // state
  const videos = reactive<storeVideos>({
    isLoading: false,
    error: null,
    list: {},
  })

  // actions
  const updateVideos = ({ isLoading, error, list }: storeVideos) => {
    videos.error = error
    videos.isLoading = isLoading
    if (list) videos.list = list
  }

  const requestVideoList = async () => {
    if (videos.isLoading) return
    updateVideos({ isLoading: true, error: null })
    const [error, response] = await getVideoScheduleRequest()
    const convertedList = VideoListModel.create(response)
    return updateVideos({ isLoading: false, error: error, list: convertedList })
  }

  // getters
  const videoListGroupedByGenre = computed(() => {
    if (videos.error) return {}
    return VideoListModel.getVideoListGroupedByGenre(videos.list)
  })

  const genresList = computed(() => VideoListModel.getGenresList(videoListGroupedByGenre.value))

  // methods
  const sortVideoByRating = (videoList: Array<Video>) => {
    return videoList.sort((a: Video, b: Video) => {
      if (a.rating > b.rating) {
        return -1
      }
      if (a.rating < b.rating) {
        return 1
      }
      return 0
    })
  }

  const getVideoListByGenre = (genreName: string, isSortEnable: boolean) => {
    const videoListId = videoListGroupedByGenre.value[genreName]
    if (!videoListId) return []
    let res = videoListId.map((videoId: number) => toRaw(videos.list[videoId]))
    if (isSortEnable) res = sortVideoByRating(res)
    return res
  }

  return {
    videos,
    requestVideoList,
    genresList,
    videoListGroupedByGenre,
    sortVideoByRating,
    getVideoListByGenre,
  }
})
