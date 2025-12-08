import type { Video } from '@/types/VideoType'

export interface VideoListResponse {
  data: Array<Video>
}

export type KeyVideoListItem = Record<Video['id'], Video>
