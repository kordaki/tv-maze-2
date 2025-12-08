import { BaseModel } from './VideoBaseModel'
import type { Video, VideoResponse } from '../../types'

export class VideoModel extends BaseModel {
  static create(video: VideoResponse['data']): Video {
    if (!video) return null
    return {
      id: video.id,
      name: video.name,
      genres: video.genres,
      language: video.language,
      image: this.getOriginalImage(video.image),
      summary: video.summary,
      type: video.type,
      rating: this.getRating(video.rating),
      status: video.status,
    }
  }

  static getOriginalImage = (image: { medium: string; original: string } | null) => {
    if (!image || !image.original) {
      return null
    }
    return image.original
  }
}
