import { BaseModel } from './VideoBaseModel'
import type { VideoListItem, KeyVideoListItem, VideoListResponse } from '../../types'

export class VideoListModel extends BaseModel {
  static create(data: VideoListResponse['data']): KeyVideoListItem {
    if (!data) return {}
    const newVideoList = data.reduce((obj: any, dataItem: any) => {
      const id = dataItem._embedded.show.id
      obj[id] = this.createVideoItem(dataItem)
      return obj
    }, {})
    return newVideoList
  }

  static createVideoItem(data: any): VideoListItem {
    return {
      id: data._embedded.show.id,
      name: data._embedded.show.name,
      genres: data._embedded.show.genres,
      language: data._embedded.show.language,
      thumbnail: this.getThumbnail(data._embedded.show.image),
      summary: data._embedded.show.summary,
      type: data._embedded.show.type,
      rating: this.getRating(data._embedded.show.rating),
      status: data._embedded.show.status,
    }
  }

  static getThumbnail = (image: { medium: string; original: string } | null) => {
    if (!image || !image.medium) {
      return null
    }
    return image.medium
  }

  static getVideoListGroupedByGenre = (videoList: Array<VideoListItem>) => {
    const groupedByGenre = { Unknown: [] }
    Object.keys(videoList).forEach((key) => {
      const video: VideoListItem = videoList[key]
      if (video.genres.length === 0) {
        groupedByGenre['Unknown'].push(video.id)
        return
      }
      video.genres.forEach((genre: string) => {
        if (groupedByGenre[genre]) {
          groupedByGenre[genre].push(video.id)
        } else {
          groupedByGenre[genre] = [video.id]
        }
      })
    })
    return groupedByGenre
  }

  static getGenresList = (videoListGroupedByGenre: KeyVideoListItem) => {
    return Object.keys(videoListGroupedByGenre)
  }
}
