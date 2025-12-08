<script setup lang="ts">
defineProps<{
  error: string
}>();
</script>
<template>
  <section>
    <h1>Error</h1>
    <br />
    <h2>{{ error }}</h2>
  </section>
</template>
