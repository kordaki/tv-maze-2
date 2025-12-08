<script setup lang="ts">
import { useRoute } from "vue-router";
import VideoItem from './VideoListItem.vue';
import { useVideoListStore } from '@/stores/VideoListStore';

const route = useRoute();
const videoListStore = useVideoListStore();

defineProps<{
  genre: string | null;
}>();

</script>

<template>
  <h2 class="genre-name">{{ genre }}</h2>
  <section class="video-list">
    <VideoItem v-for="video in videoListStore.getVideoListByGenre(genre, route.query.isSortEnable === 'true')"
      :key="video.id" :id="video.id" :image="video.image" :name="video.name" :rating="video.rating"
      :genres="video.genres" :language="video.language" :type="video.type" :status="video.status"
      :summary="video.summary" />
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
