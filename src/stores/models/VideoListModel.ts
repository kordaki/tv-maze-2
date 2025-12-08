import { BaseModel } from './VideoBaseModel'
import type { VideoListItem, KeyVideo, VideoListResponse } from '../../types'

export class VideoListModel extends BaseModel {
  static create(data: VideoListResponse['data']): VideoListModel {
    if (!data) return {}

    const newVideoList = data.reduce((obj: any, dataItem: any) => {
      const id = dataItem._embedded.show.id
      obj[id] = {
        id: dataItem._embedded.show.id,
        name: dataItem._embedded.show.name,
        genres: dataItem._embedded.show.genres,
        language: dataItem._embedded.show.language,
        thumbnail: this.getThumbnail(dataItem._embedded.show.image),
        summary: dataItem._embedded.show.summary,
        type: dataItem._embedded.show.type,
        rating: this.getRating(dataItem._embedded.show.rating),
        status: dataItem._embedded.show.status,
      }
      return obj
    }, {})
    return newVideoList
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

  static getGenresList = (videoListGroupedByGenre: KeyVideo) => {
    return Object.keys(videoListGroupedByGenre)
  }
}
