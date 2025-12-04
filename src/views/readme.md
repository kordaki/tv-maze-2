# Views

This directory contains the **page-level components** (views) for the application. Each file in this directory represents a distinct page/route in the application.

## Purpose

Views are used to define the main pages that users navigate to in the application. They are registered as route components in `src/router/index.ts`.

## Current Views

- **HomeView.vue** - The home/landing page of the application (route: `/`)
- **VideoView.vue** - The video detail page (route: `/video/:id`)

## Usage

Views are imported and used in the router configuration:

```typescript
// src/router/index.ts
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/video/:id',
      name: 'video',
      component: () => import('../views/VideoView.vue'),
    },
  ],
})
```

## Convention

- Views are typically named with the `*View.vue` suffix
- They can be imported directly (eager loading) or dynamically (lazy loading) for code-splitting
- Views compose smaller reusable components from the `src/components/` directory
