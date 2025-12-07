import type { Video , KeyVideo, VideoResponse } from "../../types";

export class VideoListModel {
  static create(data: VideoResponse["data"]): VideoListModel {
    if (!data) return {};

    const newVideoList = data.reduce((obj: any, dataItem: any) => {
      const id = dataItem._embedded.show.id;
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
      };
      return obj;
    }, {});
    return newVideoList;
  }

  static getThumbnail = (image: { medium: string; original: string } | null) => {
    if (!image || !image.medium) {
      return null;
    }
    return image.medium;
  }

  static getRating = (rating: { average: number } | null) => {
    if (!rating || !rating.average) {
      return null;
    }
    return rating.average;
  }

  static getVideoListGroupedByGenre = (videoList : Array<Video> ) => {
    const groupedByGenre = { Unknown: [] };
    Object.keys(videoList).forEach((key) => {
      const video: Video = videoList[key];
      if (video.genres.length === 0) {
        groupedByGenre["Unknown"].push(video.id);
        return;
      }
      video.genres.forEach((genre: string) => {
        if (groupedByGenre[genre]) {
          groupedByGenre[genre].push(video.id);
        } else {
          groupedByGenre[genre] = [video.id];
        }
      });
    });
    return groupedByGenre;
  };

  static getGenresList = (videoListGroupedByGenre: KeyVideo) => {
    return Object.keys(videoListGroupedByGenre);
  };
}
