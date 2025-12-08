<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const isSortEnabled = ref(Boolean(route.query.sortByRaring));

const switchSortByRating = () => {
  isSortEnabled.value = !isSortEnabled.value;
  router.push({
    name: "home",
    query: { ...route.query, isSortEnable: isSortEnabled.value.toString() },
  });
};

const clickLabelHandler = (e: Event) => {
  e.preventDefault();
  switchSortByRating();
};
</script>

<template>
  <section class="sort">
    <input class="sort-check" type="checkbox" id="sort-by-rating" value="sort-by-rating" :checked="isSortEnabled"
      @click="switchSortByRating" />
    <label for="sort-by-rating" @click="clickLabelHandler">Sort by Rating</label><br />
  </section>
</template>

<style>
.sort {
  display: flex;
  align-items: center;
}

.sort-check {
  height: 2rem;
  width: 2rem;
}

.sort-check:checked {
  accent-color: var(--color-primary);
}

.sort label {
  padding-left: 1rem;
  cursor: pointer;
}
</style>
