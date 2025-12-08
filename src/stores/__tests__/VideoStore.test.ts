import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useVideoStore } from '../VideoStore'
import { getVideoRequest } from '@/services/api/VideoDataServices'
import { VideoModel } from '../models/VideoModel'

vi.mock('@/services/api/VideoDataServices')
vi.mock('../models/VideoModel')

describe('useVideoStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('should initialize with default state', () => {
    const store = useVideoStore()

    expect(store.video.isLoading).toBe(false)
    expect(store.video.error).toBeNull()
    expect(store.video.data).toBeUndefined()
  })

  it('should request video successfully', async () => {
    const mockVideo = { id: 1, name: 'Test Video' }
    const mockConvertedVideo = { id: 1, title: 'Test Video' }

    vi.mocked(getVideoRequest).mockResolvedValue([null, mockVideo])
    vi.mocked(VideoModel.create).mockReturnValue(mockConvertedVideo)

    const store = useVideoStore()
    await store.requestVideo(1)

    expect(getVideoRequest).toHaveBeenCalledWith(1)
    expect(VideoModel.create).toHaveBeenCalledWith(mockVideo)
    expect(store.video.isLoading).toBe(false)
    expect(store.video.error).toBeNull()
    expect(store.video.data).toEqual(mockConvertedVideo)
  })

  it('should handle video request error', async () => {
    const mockError = new Error('Network error')

    vi.mocked(getVideoRequest).mockResolvedValue([mockError, undefined])
    vi.mocked(VideoModel.create).mockReturnValue(undefined)

    const store = useVideoStore()
    await store.requestVideo(1)

    expect(store.video.isLoading).toBe(false)
    expect(store.video.error).toEqual(mockError)
  })

  it('should not request video if already loading', async () => {
    const store = useVideoStore()
    store.video.isLoading = true

    await store.requestVideo(1)

    expect(getVideoRequest).not.toHaveBeenCalled()
  })

  it('should set loading state during request', async () => {
    vi.mocked(getVideoRequest).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve([null, {}]), 100)),
    )

    const store = useVideoStore()
    const promise = store.requestVideo(1)

    expect(store.video.isLoading).toBe(true)

    await promise

    expect(store.video.isLoading).toBe(false)
  })
})
