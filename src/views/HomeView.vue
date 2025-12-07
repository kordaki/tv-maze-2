<script setup lang="ts">
// import TheWelcome from '../components/TheWelcome.vue'
import { onMounted } from 'vue';
import { useVideoListStore } from '@/stores/videoListStore';
import IconLoading from '@/components/icons/IconLoading.vue';
import VideoList from '../components/VideoList.vue';
const videoListStore = useVideoListStore();

onMounted(() => {
  videoListStore.requestVideoList();
});

</script>

<template>
  <main>
    <section>
      <IconLoading v-if="videoListStore.videos.isLoading" />
      <section v-else-if="videoListStore.genresList.length > 0">
        <VideoList v-for="genre in videoListStore.genresList" :genre="genre" v-bind:key="genre" />
      </section>
    </section>
  </main>
</template>
