import { MockBuilder } from "./MockBuilder";
import type { Video } from "@/types/VideoType";

export class VideoMockBuilder extends MockBuilder {
  create() {
    return {
      id: this.randomId(),
      image: this.randomImage(),
      name: this.randomName(),
      summary: this.randomSummary(),
      rating: this.randomRating(),
      genres: this.randomGenre(),
      language: this.randomLanguage(),
      type: this.randomType(),
    };
  }

  createListOf(number: number) {
    const videoList = [];
    for (let i = 0; i < number; i++) {
      videoList.push(this.create());
    }
    return videoList;
  }

  createKeyListOf(number: number) {
    const videoKeyList: Record<Video["id"], Video> = {};
    for (let i = 0; i < number; i++) {
      const video = this.create();
      videoKeyList[video.id] = video;
    }
    return videoKeyList;
  }
}
