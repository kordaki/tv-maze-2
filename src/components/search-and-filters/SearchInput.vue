<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const userSearchQuery = ref("");

const searchHandler = (e: Event) => {
  e.preventDefault();
  router.push({
    name: "home",
    query: { ...route.query, q: userSearchQuery.value },
  });
};
</script>

<template>
  <section>
    <form @submit="searchHandler">
      <input
        class="search-input"
        type="search"
        name="search"
        placeholder="search here..."
        v-model="userSearchQuery"
      />
      <!-- <input type="submit" name="Search" /> -->
      <button class="search-button" @click="searchHandler">Go</button>
    </form>
  </section>
</template>

<style>
.search-input {
  height: 2.5rem;
  padding: 0 0.5rem;
  width: 10rem;
  transition: all 0.15s ease-out;
  background-color: var(--color-background-soft);
  border: none;
  color: var(--color-text);
  border-bottom: 1px solid var(--color-border);
}
.search-input:focus {
  width: 15rem;
  background: var(--color-background-mute);
  border-color: var(--color-primary);
}
</style>
