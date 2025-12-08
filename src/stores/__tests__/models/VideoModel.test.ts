import { describe, it, expect } from 'vitest'
import { VideoModel } from '../../models/VideoModel'

describe('VideoModel', () => {
  describe('create', () => {
    it('should return null when video is null', () => {
      expect(VideoModel.create(null as any)).toBeNull()
    })

    it('should return null when video is undefined', () => {
      expect(VideoModel.create(undefined as any)).toBeNull()
    })

    it('should create video object with all properties', () => {
      const mockVideo = {
        id: 1,
        name: 'Test Show',
        genres: ['Drama', 'Action'],
        language: 'English',
        image: { medium: 'http://image.url', original: 'http://image-orig.url' },
        summary: 'Test summary',
        type: 'Scripted',
        rating: { average: 8.5 },
        status: 'Running',
      }

      const result = VideoModel.create(mockVideo)

      expect(result).toEqual({
        id: 1,
        name: 'Test Show',
        genres: ['Drama', 'Action'],
        language: 'English',
        image: 'http://image-orig.url',
        summary: 'Test summary',
        type: 'Scripted',
        rating: 8.5,
        status: 'Running',
      })
    })

    it('should handle video with null image', () => {
      const mockVideo = {
        id: 1,
        name: 'Test Show',
        genres: ['Drama'],
        language: 'English',
        image: null,
        summary: 'Test summary',
        type: 'Scripted',
        rating: { average: 7.0 },
        status: 'Running',
      }

      const result = VideoModel.create(mockVideo)

      expect(result.image).toBeNull()
    })
  })

  describe('getOriginalImage', () => {
    it('should return null when image is null', () => {
      expect(VideoModel.getOriginalImage(null)).toBeNull()
    })

    it('should return null when medium is not available', () => {
      expect(VideoModel.getOriginalImage({ medium: 'test', original: '' })).toBeNull()
    })

    it('should return medium image url', () => {
      expect(
        VideoModel.getOriginalImage({ medium: 'http://test.com', original: 'http://orig.com' }),
      ).toBe('http://orig.com')
    })
  })
})
