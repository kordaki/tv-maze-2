<script setup lang="ts">
import VideoItem from './VideoItem.vue';
import { useVideoListStore } from '@/stores/videoListStore';

const videoListStore = useVideoListStore();

defineProps<{
  genre: string;
}>();

</script>

<template>
  <h2 class="genre-name">{{ genre }}</h2>
  <section class="video-list">
    <VideoItem v-for="video in videoListStore.getVideoListByGenre(genre, false)" :key="video.id"
      :thumbnail="video.image?.medium" :name="video.name" :rating="video.rating" :genres="video.genres"
      :language="video.language" :type="video.type" :status="video.status" :summary="video.summary" />
  </section>
</template>


<style>
.genre-name {
  border-bottom: 1px solid var(--color-border);
  padding-left: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  position: sticky;
  top: 0;
  background: var(--color-background);
  z-index: 1;
}

.video-list {
  overflow-x: auto;
  white-space: nowrap;
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin-bottom: 2rem;
}
</style>
