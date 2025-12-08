<script setup lang="ts">
import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";
// stores
import { useSearchListStore } from "@/stores/SearchListStore";
// components
import VideoItem from "./VideoListItem.vue";
import IconLoading from "./icons/IconLoading.vue";
import ErrorContent from "./common/ErrorContent.vue";
import NotFound from "./common/NotFound.vue";

const searchListStore = useSearchListStore();
const router = useRouter();
const route = useRoute();

const cancelSearch = () => {
  const { q, ...newQuery } = route.query;
  router.push({
    name: "home",
    query: newQuery,
  });
};

watch(
  () => route.query.q,
  async (newQuery: string) => {
    searchListStore.searchVideoRequest(newQuery);
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <section class="search-result">
    <div class="top">
      <h2>
        Search result about <i>"{{ route.query.q }}"</i>
      </h2>
      <button class="cancel-search" @click="cancelSearch">Cancel Search</button>
    </div>
    <section class="search-video-list">
      <IconLoading v-if="searchListStore.videos.isLoading" />
      <ErrorContent v-else-if="searchListStore.videos.error" :error="searchListStore.videos.error" />
      <NotFound v-else-if="searchListStore.videos.list.length === 0" />

      <VideoItem v-else v-for="video in searchListStore.videos.list" v-bind:key="video.id" :id="video.id"
        :image="video.image" :name="video.name" :summary="video.summary" :rating="video.rating"
        :language="video.language" :type="video.type" :genres="video.genres" :status="video.status" />
    </section>
  </section>
</template>

<style>
.search-video-list {
  display: flex;
  flex-wrap: wrap;
}

.search-result .top {
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cancel-search {
  background-color: var(--color-secondary);
  color: var(--color-text);
}
</style>
