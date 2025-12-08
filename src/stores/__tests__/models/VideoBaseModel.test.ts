import { describe, it, expect } from 'vitest'
import { BaseModel } from '../../models/VideoBaseModel'

describe('VideoBaseModel', () => {
  describe('getRating', () => {
    it('should return null when rating is null', () => {
      expect(BaseModel.getRating(null)).toBeNull()
    })

    it('should return null when average is not available', () => {
      expect(BaseModel.getRating({ average: 0 })).toBeNull()
    })

    it('should return average rating', () => {
      expect(BaseModel.getRating({ average: 7.5 })).toBe(7.5)
    })
  })
})
