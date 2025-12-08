import {
  idList,
  nameList,
  languageList,
  genreList,
  summaryList,
  typeList,
  imageList,
} from "./data";
import type { Video } from "@/types/VideoType";

export class MockBuilder {
  randomBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  randomItemInArray(data: Array<any>) {
    const randomNumber = this.randomBetween(0, data.length - 1);
    return data[randomNumber];
  }

  randomId(): Video["id"] {
    return this.randomItemInArray(idList);
  }

  randomName(): Video["name"] {
    return this.randomItemInArray(nameList);
  }

  randomLanguage(): Video["language"] {
    return this.randomItemInArray(languageList);
  }

  randomGenre(): Video["genres"] {
    const possibleCounts = this.randomBetween(0, 3);
    const newGenreList: Array<string> = [];
    for (let i = 0; i < possibleCounts; i++) {
      newGenreList.push(this.randomItemInArray(genreList));
    }
    return [...new Set(newGenreList)];
  }

  randomSummary(): Video["summary"] {
    return this.randomItemInArray(summaryList);
  }

  randomType(): Video["type"] {
    return this.randomItemInArray(typeList);
  }

  randomImage(): Video["image"] {
    return this.randomItemInArray(imageList);
  }

  randomRating(): Video["rating"] {
    return { average: this.randomBetween(1, 100) / 10 };
  }
}
