<template>
  <header class="header">
    <h1 class="page-title">Video AMRO</h1>
    <nav class="navigator">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/video/1">Video 1</RouterLink>
    </nav>
  </header>
</template>

<style>
.header {
  display: flex;
  align-items: center;
  background: var(--color-background-soft);
  padding: 1rem 1.5rem;
}

.header .page-title {
  display: inline-block;
  margin-right: 2rem;
}

.header .navigator a {
  font-size: 1rem;
  margin: 0 0.5rem;
}
</style>
