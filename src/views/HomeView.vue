<script setup lang="ts">
// import TheWelcome from '../components/TheWelcome.vue'
import { onMounted } from 'vue';
import { useVideoListStore } from '@/stores/videoListStore';
import VideoList from '../components/VideoList.vue';
const videoListStore = useVideoListStore();

onMounted(() => {
  videoListStore.getVideoList();
});

</script>

<template>
  <main>
    <div v-if="videoListStore.videos.isLoading"> is Loading </div>
    <VideoList />
  </main>
</template>
