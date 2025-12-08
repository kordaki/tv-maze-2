import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { searchVideosRequest } from '@/services/api/VideoDataServices'
import type { Video } from '@/types'
import { VideoModel } from './models/VideoModel'

type storeVideos = {
  isLoading: boolean
  error?: Error | null
  list?: Array<Video>
}

export const useSearchListStore = defineStore('searchList', () => {
  // state
  const videos = reactive<storeVideos>({
    isLoading: false,
    error: null,
    list: [],
  })

  // actions
  const updateVideos = ({ isLoading, error, list }: storeVideos) => {
    videos.error = error
    videos.isLoading = isLoading
    if (list) videos.list = list
  }

  // methods
  const searchVideoRequest = async (query: string) => {
    if (videos.isLoading) return
    updateVideos({ isLoading: true, error: null })
    const [error, response] = await searchVideosRequest(query)
    const convertedList = response.map((item) => VideoModel.create(item.show))
    updateVideos({ isLoading: false, error: error, list: convertedList })
  }

  return {
    videos,
    updateVideos,
    searchVideoRequest,
  }
})
