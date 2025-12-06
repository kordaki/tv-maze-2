import { reactive, computed } from "vue";
import { defineStore } from "pinia";
import { getVideoScheduleRequest } from "@/services/api/VideoDataServices";
import { VideoListModel } from "./models/VideoListModel";

export const useVideoListStore = defineStore("videoList", () => {
  // state
  const videos = reactive({
    isLoading: false,
    error: "hi oskol",
    list: {},
  })

  // actions
  const updateVideos = ({ isLoading, error, list }: any) => {
    videos.error = error;
    videos.isLoading = isLoading;
    if (list) videos.list = list;
  };

  const getVideoList =  async () => {
    if (videos.isLoading) return;
    updateVideos({ isLoading: true, error: null });
    const [error, response] = await getVideoScheduleRequest();
    console.log(" -- [videoList Store] -- response from store:", response);
    const convertedList = VideoListModel.create(response);
    console.log(" -- [videoList Store] -- convertedList:", convertedList);
    return updateVideos({ isLoading: false, error: error, list: convertedList});
  }


  // getters
  // const getVideoList = computed (() => {
  //   return videos.list;
  // })



  return {
    videos,
    getVideoList
  };

});
