import { reactive, computed } from "vue";
import { defineStore } from "pinia";
import { getVideoScheduleRequest } from "@/services/api/VideoDataServices";

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
    // if(!error){
    //   const convertedList
    // }
    return updateVideos({ isLoading: false, error: error, list: response});
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
