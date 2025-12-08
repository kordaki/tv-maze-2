import type { Video } from '@/types/VideoType'
export interface VideoListItem
  extends Pick<
    Video,
    'id' | 'name' | 'genres' | 'language' | 'summary' | 'type' | 'rating' | 'status'
  > {
  thumbnail: string | null
}
export interface VideoListResponse {
  data: Array<Video>
}

export type KeyVideoListItem = Record<VideoListItem['id'], VideoListItem>
