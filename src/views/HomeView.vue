<script setup lang="ts">
// import TheWelcome from '../components/TheWelcome.vue'
import { onMounted } from 'vue';
import { useRoute } from "vue-router";
import { useVideoListStore } from '@/stores/VideoListStore';
import IconLoading from '@/components/icons/IconLoading.vue';
import VideoList from '../components/VideoList.vue';
import SearchResult from '@/components/SearchResult.vue';
import SortButton from '@/components/search-and-filters/SortButton.vue';
import Search from '@/components/search-and-filters/SearchInput.vue';
const videoListStore = useVideoListStore();

const route = useRoute();

onMounted(() => {
  videoListStore.requestVideoList();
});

</script>

<template>
  <main>
    <section>
      <SortButton />
      <Search />
    </section>

    <SearchResult v-if="!!(route.query.q)" />
    <section v-else>
      <IconLoading v-if="videoListStore.videos.isLoading" />
      <section v-else-if="videoListStore.genresList.length > 0">
        <VideoList v-for="genre in videoListStore.genresList" :genre="genre" v-bind:key="genre" />
      </section>
    </section>
  </main>
</template>
