export type VideoImage = {
  medium: string;
  original: string;
};

export type Rating = {
  average: number;
};

export interface Video {
  id: number;
  language: string;
  title: string;
  rating: Rating;
  ended: string;
  url: string;
  weight: number;
  image: VideoImage;
  thumbnail: string;
  genres: Array<string>;
  summary: string;
  type: string;
  status: string;
}

export type KeyVideo = Record<Video["id"], Video>;

export interface VideoResponse {
  data: Video;
}
