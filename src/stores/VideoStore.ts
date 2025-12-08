import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { getVideoRequest } from '@/services/api/VideoDataServices'
import { VideoModel } from './models/VideoModel'

import type { Video } from '@/types'

type VideoStore = {
  isLoading: boolean
  error?: Error | null
  data?: Video
}

export const useVideoStore = defineStore('video', () => {
  // state
  const video = reactive<VideoStore>({
    isLoading: false,
    error: null,
    data: undefined,
  })

  // actions
  const updateVideo = ({ isLoading, error, data }: VideoStore) => {
    video.error = error
    video.isLoading = isLoading
    if (data) video.data = data
  }

  // methods
  const requestVideo = async (id: number) => {
    if (video.isLoading) return
    updateVideo({ isLoading: true, error: null })
    const [error, response] = await getVideoRequest(id)
    const convertedVideo = VideoModel.create(response)
    updateVideo({ isLoading: false, error: error, data: convertedVideo })
  }

  return {
    video,
    requestVideo,
  }
})
