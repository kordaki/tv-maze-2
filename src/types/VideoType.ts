export type VideoImage = {
  medium: string | null
  original: string | null
}

export interface Video {
  id: number
  language: string | null
  name: string
  rating: number | null
  image: VideoImage
  genres: Array<string>
  summary: string | null
  type: string
  status: string
}

export interface VideoResponse {
  data: any
}
