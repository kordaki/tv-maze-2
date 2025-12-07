export interface Video {
  id: number;
  language: string | null;
  name: string;
  rating: number | null;
  thumbnail: string | null;
  genres: Array<string>;
  summary: string | null;
  type: string;
  status: string;
}

export type KeyVideo = Record<Video["id"], Video>;

export interface VideoResponse {
  data: Video;
}
