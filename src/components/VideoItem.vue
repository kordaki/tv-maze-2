<script setup>
defineProps({
  thumbnail: String,
  title: String,
  rate: [Number, String],
  genres: [String, Array],
  language: String,
  type: String,
  status: String,
  summary: String
})
</script>

<template>
  <article class="video" @click="navigateToVideoPage">
    <div class="hero">
      <img :src="thumbnail ||
        'https://placehold.co/210x295?text=image+not+found'
        " alt="video" title="video" />
      <div class="badge">{{ status }}</div>


      <div class="description" v-html="summary"></div>
    </div>
    <h3 class="name">{{ title }}</h3>
    <div class="attribute">
      <!-- Rate: <b v-if="rating.average">{{ rating.average }}</b> <i v-else>Empty</i> -->
      Rate: <b>{{ rate }}</b>
    </div>
    <div class="attribute">
      Genre:
      <span v-if="genres.length > 0">
        <span v-for="(genre, idx) in genres" :key="idx">{{ genre + (idx < genres.length - 1 ? ", " : "") }} </span>
        </span>
        <i v-else> Unknown </i>
    </div>

    <div class="attribute">Language: {{ language }}</div>
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
  /* overflow: hidden; */
  position: relative;
}

.video .hero img {
  height: var(--video-height);
  width: var(--video-width);
  object-fit: cover;
  background-image: url("https://via.placeholder.com/210x295.png?text=Loading");
}

.video .hero .badge {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  background: var(--color-accent);
  color: var(--color-on-accent);
  padding: 0.2rem 0.5rem;
  font-size: 0.75rem;
  border-radius: 4px;
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
}

.video .attribute {
  overflow: hidden;
  text-overflow: ellipsis;
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
</style>
