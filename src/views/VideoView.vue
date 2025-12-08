<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useVideoStore } from '@/stores/VideoStore';
import ErrorContent from '@/components/common/ErrorContent.vue';
import NotFound from '@/components/common/NotFound.vue';
import IconLoading from '@/components/icons/IconLoading.vue';

const route = useRoute();
const videoStore = useVideoStore();

onMounted(() => {
  videoStore.requestVideo(Number(route.params.id));
});
</script>

<template>
  <main id="video-page" class="video-page">
    <IconLoading v-if="videoStore.video.isLoading" />
    <ErrorContent v-else-if="videoStore.video.error" :error="videoStore.video.error" />
    <NotFound v-else-if="!(videoStore.video.data)" />
    <section v-else class="video-page">
      <div class="image">
        <img :src="videoStore.video.data.image?.original || 'https://placehold.co/420x590?text=image+not+found'" />
      </div>
      <div class="content">
        <h1 class="title">{{ videoStore.video.data.name }}</h1>
        <ul class="attribute">
          <li>
            Rate:
            <b v-if="videoStore.video.data.rating">{{ videoStore.video.data.rating }}</b>
            <i v-else>Empty</i>
          </li>
          <li>
            Genre:
            <span v-if="videoStore.video.data?.genres.length > 0">
              <span>{{ videoStore.video.data?.genres.join(', ') }} </span>
            </span>
            <i v-else> Unknown </i>
          </li>
          <li>Language: {{ videoStore.video.data.language }}</li>
          <li>Type: {{ videoStore.video.data.type }}</li>
        </ul>
        <div v-if="videoStore.video.data.summary" class="attribute summary" v-html="videoStore.video.data.summary">
        </div>
      </div>
    </section>
  </main>
</template>

<style>
.video-page {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.video-page .image {
  width: 100%;
  height: auto;
  background: url('https://placehold.co/420x590?text=Loading') center center no-repeat;
  background-size: cover;
}

.video-page .content {
  flex: 1;
  padding: 1rem;
}

.video-page .content .title {
  color: var(--color-secondary);
  font-size: xx-large;
}

.video-page .image img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.video-page .content .summary {
  margin: 1rem 0;
  padding: 0.5rem;
  background: var(--color-background-mute);
}

@media (min-width: 768px) {
  .video-page {
    flex-direction: row;
  }

  .video-page .image {
    width: auto;
    min-width: 30%;
    max-width: 50%;
    height: calc(100vh - 85px);
  }

  .video-page .content .title {
    font-size: xxx-large;
  }
}
</style>
