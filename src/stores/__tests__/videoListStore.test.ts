import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useVideoListStore } from '../VideoListStore'
import { getVideoScheduleRequest } from '@/services/api/VideoDataServices'
import { VideoListModel } from '../models/videoListModel'
import type { Video } from '@/types'

vi.mock('@/services/api/VideoDataServices')
vi.mock('../models/videoListModel')

describe('useVideoListStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('should initialize with default state', () => {
    const store = useVideoListStore()
    expect(store.videos.isLoading).toBe(false)
    expect(store.videos.error).toBeNull()
    expect(store.videos.list).toEqual({})
  })

  it('should request video list successfully', async () => {
    const mockResponse = [{ id: 1, name: 'Show 1' }]
    const mockConvertedList = { 1: { id: 1, name: 'Show 1' } }

    vi.mocked(getVideoScheduleRequest).mockResolvedValue([null, mockResponse])
    vi.spyOn(VideoListModel, 'create').mockReturnValue(mockConvertedList)

    const store = useVideoListStore()
    await store.requestVideoList()

    expect(store.videos.isLoading).toBe(false)
    expect(store.videos.error).toBeNull()
    expect(store.videos.list).toEqual(mockConvertedList)
  })

  it('should handle request error', async () => {
    const mockError = new Error('API Error')
    vi.mocked(getVideoScheduleRequest).mockResolvedValue([mockError, null])

    const store = useVideoListStore()
    await store.requestVideoList()

    expect(store.videos.error).toBe(mockError)
    expect(store.videos.isLoading).toBe(false)
  })

  it('should not request if already loading', async () => {
    const store = useVideoListStore()
    store.videos.isLoading = true

    await store.requestVideoList()

    expect(getVideoScheduleRequest).not.toHaveBeenCalled()
  })

  it('should sort videos by rating descending', () => {
    const store = useVideoListStore()
    const mockVideos = [
      { id: 1, rating: { average: 7.5 } },
      { id: 2, rating: { average: 9.0 } },
      { id: 3, rating: { average: 8.0 } },
    ] as Video[]

    const sorted = store.sortVideoByRating(mockVideos)

    expect(sorted[0].rating.average).toBe(9.0)
    expect(sorted[1].rating.average).toBe(8.0)
    expect(sorted[2].rating.average).toBe(7.5)
  })

  it('should get video list by genre without sorting', () => {
    const store = useVideoListStore()
    const mockVideo = { id: 1, name: 'Show 1', rating: { average: 8.0 } } as unknown as Video

    store.videos.list = { 1: mockVideo }
    vi.mocked(VideoListModel.getVideoListGroupedByGenre).mockReturnValue({ Drama: [1] })

    const result = store.getVideoListByGenre('Drama', false)

    expect(result).toHaveLength(1)
    expect(result[0].id).toBe(1)
  })

  it('should get video list by genre with sorting', () => {
    const store = useVideoListStore()
    const mockVideos = {
      1: { id: 1, rating: { average: 7.0 } } as unknown as Video,
      2: { id: 2, rating: { average: 9.0 } } as unknown as Video,
    }

    store.videos.list = mockVideos
    vi.mocked(VideoListModel.getVideoListGroupedByGenre).mockReturnValue({ Drama: [1, 2] })

    const result = store.getVideoListByGenre('Drama', true)

    expect(result[0].rating.average).toBe(9.0)
    expect(result[1].rating.average).toBe(7.0)
  })

  it('should return empty array for non-existent genre', () => {
    const store = useVideoListStore()
    vi.mocked(VideoListModel.getVideoListGroupedByGenre).mockReturnValue({})

    const result = store.getVideoListByGenre('NonExistent', false)

    expect(result).toEqual([])
  })

  it('should return empty object for videoListGroupedByGenre when error exists', () => {
    const store = useVideoListStore()
    store.videos.error = new Error('Test error')

    expect(store.videoListGroupedByGenre).toEqual({})
  })
})
