<script setup>

import { ref } from 'vue'
import VideoItem from './VideoItem.vue';
import { useVideoListStore } from '@/stores/videoListStore';

const videoListStore = useVideoListStore();

const videos = ref([
  {
    id: 1,
    thumbnail: 'https://static.tvmaze.com/uploads/images/medium_portrait/359/898306.jpg',
    name: 'Breaking Bad',
    rating: 9.5,
    genres: ['Crime', 'Drama', 'Thriller'],
    language: 'English',
    type: 'Scripted',
    status: 'Ended',
    summary: "<p><b>ABC News Live Weekend </b>will feature the biggest stories of the week with all the facts and analysis viewers need to reflect on global events and prepare for what's coming next.</p>",
  },
  {
    id: 2,
    thumbnail: 'https://static.tvmaze.com/uploads/images/medium_portrait/528/1320416.jpg',
    name: 'Game of Thrones',
    rating: 9.3,
    genres: ['Drama', 'Adventure', 'Fantasy'],
    language: 'English',
    type: 'Scripted',
    status: 'Ended',
    summary: "<p>Desi Lydic covers Melania getting into the mandatory Christmas spirit by decorating the un-bulldozed parts of the White House, Kash Patel refusing to do his job without a big girl FBI jacket, and Pete Hegseth responding to possible war crimes charges by throwing his admiral and a cartoon turtle under the bus. Plus, Jordan Klepper wants YOU to join Hegseth's scapegoat army. Michael Kosta drops the hottest tips for a cash-tacular Christmas: Skip expensive Christmas gifts by converting religions, swap pasta for wringing sauce cloths, and gift an AI teddy bear that covers sex ed. Actor and philanthropist Nikki DeLoach sits down with her friend Desi Lydic to discuss starring in the latest Hallmark movie, \"A Grand Ole Opry Christmas,\" how working on the film was a healing experience for her after losing her father, and why Hallmark movies seem to resonate with viewers during hard times. She also discusses her impactful philanthropic work and encourages people to participate in Giving Tuesday by supporting two organizations close to her heart, Mind What Matters, which supports caregivers in families affected by dementia, and Children's Hospital LA, a safety net hospital that turns no child away regardless of a family's financial situation and saved the life of DeLoach's own son.</p>",
  },
  {
    id: 3,
    thumbnail: 'https://static.tvmaze.com/uploads/images/medium_landscape/601/1504098.jpg',
    name: 'Nikki DeLoach',
    rating: 8.7,
    genres: ['Drama', 'Fantasy', 'Horror'],
    language: 'English',
    type: 'regular',
    status: 'Running',
    summary: "<p>The democratic candidate in Tennessee's special House election makes a surprising showing in a deep-red district, Secretary Hegseth tries to distance himself from fallout over the administration's boat strikes, and Costco sues the Trump administration for full tariff refunds if the Supreme Court strikes them down. Daniella Diaz, Larry Sabato, Mark McKinnon, Barry McCaffrey, Brendan Greeley, Bharat Ramamurti, and Amb. Bill Taylor join The 11th Hour this Tuesday night.</p>",
  }
])
</script>

<template>
  <h2 class="genre-name">Nice movies</h2>
  {{ videoListStore.videos.error }}
  <section class="video-list">
    <VideoItem v-for="video in videos" :key="video.id" :thumbnail="video.thumbnail" :name="video.name"
      :rating="video.rating" :genres="video.genres" :language="video.language" :type="video.type" :status="video.status"
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
