export interface Video {
  id: number
  language: string | null
  name: string
  rating: number | null
  image: string | null
  genres: Array<string>
  summary: string | null
  type: string
  status: string
}

export interface VideoResponse {
  data: any
}
