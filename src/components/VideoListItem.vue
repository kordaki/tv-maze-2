<script setup lang="ts">
import { useRouter } from "vue-router";
import StarIcon from './icons/IconStar.vue'
import LanguageIcon from './icons/IconLanguage.vue'
import type { VideoListItem } from '@/types';
const router = useRouter();
const {
  id,
  name,
  language,
  rating,
  status,
  type,
  genres,
  summary,
  thumbnail,
} =
  defineProps<VideoListItem>()

const navigateToVideoPage = () => {
  router.push({ name: 'video', params: { id: id } })
}
</script>

<template>
  <article class="video" @click="navigateToVideoPage">
    <div class="hero">
      <img :src="thumbnail ||
        'https://placehold.co/210x295?text=image+not+found'
        " alt="video" title="video" />
      <div class="badge" :class="status" v-if="status">{{ status }}</div>
      <div class="description" v-html="summary"></div>
    </div>
    <h3 class="name">{{ name }}</h3>
    <div class="attribute inline">
      <span class="inline-flex">
        <LanguageIcon color="var(--color-primary)" /> {{ language }}
      </span>
      <span class="inline-flex">
        <StarIcon color="var(--color-primary)" /> <b>{{ rating || "Unknown" }}</b>
      </span>
    </div>
    <div class="attribute">
      Genre:
      <span v-if="genres.length > 0">{{ genres.join(", ") }}</span>
      <span v-else> Unknown </span>
    </div>
    <div class="attribute">Type: {{ type }}</div>
  </article>
</template>

<style scoped>
.video {
  --video-height: 295px;
  --video-width: 210px;

  cursor: pointer;
  display: inline-block;
  position: relative;
  width: var(--video-width);
  margin: 0.75rem;
}

.video::after {
  content: '';
  position: absolute;
  height: var(--video-height);
  width: var(--video-width);
  opacity: 0;
  top: 0;
  bottom: 0;
  transition: all 0.5s ease-out;
}

.video .hero {
  height: var(--video-height);
  width: var(--video-width);
  position: relative;
}

.video .hero img {
  height: var(--video-height);
  width: var(--video-width);
  object-fit: cover;
  background-image: url("https://placehold.co/210x295?text=Loading");
}

.video .hero .badge {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  background: var(--color-border-hover);
  color: var(--color-on-accent);
  padding: 0.2rem 0.5rem;
  font-size: 0.75rem;
  border-radius: 4px;
  opacity: 0.9;
}

.video .hero .badge.Running {
  background: var(--color-primary);
}

.video .hero .badge.Ended {
  background: var(--color-secondary);
}

.video .hero .description {
  position: absolute;
  top: 0;
  height: var(--video-height);
  width: var(--video-width);
  opacity: 0;
  top: 10%;
  transition: all 0.5s ease-out;

  padding: 1rem;
  font: 0.8rem/1rem tahoma;
  color: var(--vt-c-text-dark-2);

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: normal;
  display: -webkit-box !important;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.video .hero .description :deep(p) {
  display: inline-block;
}

.video:hover .hero .description {
  opacity: 1;
  top: 0;
  z-index: 2;
}

.video:hover::after {
  content: '';
  position: absolute;
  height: var(--video-height);
  width: var(--video-width);
  background-color: rgb(from var(--color-border-hover) r g b / 0.75);
  opacity: 1;
  top: 0;
  bottom: 0;
}

.video .name {
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--color-secondary);
  padding: 0.3rem 0;
}

.video .attribute {
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0.2rem;
}

.video .attribute.inline {
  display: flex;
  justify-content: space-between;
}

.video .inline-flex {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

@media (min-width: 1024px) {
  .item {
    margin-top: 0;
    padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
  }

  i {
    top: calc(50% - 25px);
    left: -26px;
    position: absolute;
    border: 1px solid var(--color-border);
    background: var(--color-background);
    border-radius: 8px;
    width: 50px;
    height: 50px;
  }

  .item:before {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    bottom: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:after {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    top: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:first-of-type:before {
    display: none;
  }

  .item:last-of-type:after {
    display: none;
  }
}

@media (max-width: 768px) {

  .video .hero .description {
    opacity: 1;
    top: unset !important;
    padding: 0.5rem 1rem 2rem;
    bottom: 0;
    height: auto;
    overflow: hidden;
    background-color: rgb(from var(--color-border-hover) r g b / 0.75);
    text-overflow: ellipsis;
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    max-height: calc(var(--video-height) / 3);
  }

  .video::after {
    display: none;
  }


}
</style>
