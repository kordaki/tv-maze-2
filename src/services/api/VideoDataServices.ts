import apiClient from "@/configs/http";
import type { Video, VideoResponse } from "@/types/VideoType";

export async function getVideoScheduleRequest() {
  try {
    // const response: any = await apiClient.get(`/schedule/full`);
    // for lighter response in dev
    const response: any = await apiClient.get(
      `/schedule/web?date=2021-05-29`
    );
    const videoList: Record<Video["id"], Video> = response.data;
    return [null, videoList];
  } catch (err) {
    return [err];
  }
}

export async function getVideoRequest(id: number) {
  try {
    const response: VideoResponse = await apiClient.get(`/shows/${id}`);
    const video: Video = response.data;
    return [null, video];
  } catch (err) {
    return [err];
  }
}

export async function searchVideosRequest(query: string) {
  try {
    const response: any = await apiClient.get(`/search/shows?q=${query}`);
    const videoList: Array<Video> = response.data;
    return [null, videoList];
  } catch (err) {
    return [err];
  }
}
