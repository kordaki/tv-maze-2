<script setup lang="ts">
// import TheWelcome from '../components/TheWelcome.vue'
import { onMounted } from 'vue';
import VideoList from '../components/VideoList.vue';
import { getVideoScheduleRequest } from '../services/api/VideoDataServices';
// import {useVideoStore} from '../stores/videoStore';
// const videoStore = useVideoStore();

onMounted(async () => {
  const [error, videoList] = await getVideoScheduleRequest();
  if (!error) {
    console.log(videoList);
  } else {
    console.error(error);
  }
});

</script>

<template>
  <main>
    <VideoList />
    <!-- <TheWelcome /> -->
  </main>
</template>
