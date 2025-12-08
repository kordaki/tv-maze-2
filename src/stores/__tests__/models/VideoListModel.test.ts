import { describe, it, expect } from 'vitest'
import { VideoListModel } from '../../models/VideoListModel'
import type { VideoResponse, Video } from '../../../types'

describe('VideoListModel', () => {
  describe('create', () => {
    it('should return empty object when data is null or undefined', () => {
      expect(VideoListModel.create(null as any)).toEqual({})
      expect(VideoListModel.create(undefined as any)).toEqual({})
    })

    it('should transform video response data into video list', () => {
      const mockData: VideoResponse['data'] = [
        {
          _embedded: {
            show: {
              id: 1,
              name: 'Test Show',
              genres: ['Drama', 'Action'],
              language: 'English',
              image: { medium: 'http://image.url', original: 'http://image-orig.url' },
              summary: 'Test summary',
              type: 'Scripted',
              rating: { average: 8.5 },
              status: 'Running',
            },
          },
        },
      ]

      const result = VideoListModel.create(mockData)

      expect(result).toEqual({
        1: {
          id: 1,
          name: 'Test Show',
          genres: ['Drama', 'Action'],
          language: 'English',
          thumbnail: 'http://image.url',
          summary: 'Test summary',
          type: 'Scripted',
          rating: 8.5,
          status: 'Running',
        },
      })
    })
  })

  describe('getThumbnail', () => {
    it('should return null when image is null', () => {
      expect(VideoListModel.getThumbnail(null)).toBeNull()
    })

    it('should return null when medium is not available', () => {
      expect(VideoListModel.getThumbnail({ medium: '', original: 'test' })).toBeNull()
    })

    it('should return medium image url', () => {
      expect(
        VideoListModel.getThumbnail({ medium: 'http://test.com', original: 'http://orig.com' }),
      ).toBe('http://test.com')
    })
  })

  describe('getVideoListGroupedByGenre', () => {
    it('should group videos with no genres under Unknown', () => {
      const videoList: any = {
        1: { id: 1, genres: [] },
      }

      const result = VideoListModel.getVideoListGroupedByGenre(videoList)

      expect(result).toEqual({ Unknown: [1] })
    })

    it('should group videos by their genres', () => {
      const videoList: any = {
        1: { id: 1, genres: ['Drama', 'Action'] },
        2: { id: 2, genres: ['Comedy'] },
        3: { id: 3, genres: ['Drama'] },
      }

      const result = VideoListModel.getVideoListGroupedByGenre(videoList)

      expect(result).toEqual({
        Unknown: [],
        Drama: [1, 3],
        Action: [1],
        Comedy: [2],
      })
    })
  })

  describe('getGenresList', () => {
    it('should return list of genre keys', () => {
      const groupedByGenre = {
        Drama: [1, 2],
        Comedy: [3],
        Action: [4],
      }

      const result = VideoListModel.getGenresList(groupedByGenre)

      expect(result).toEqual(['Drama', 'Comedy', 'Action'])
    })
  })
})
