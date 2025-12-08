# tv-maze-2

I initialized the project with a basic command `npm init vue@latest` (without any special boilerplate). It's used **Vue 3** with composition api, **TypeScript**, **Fetch**, **Vitest** and **Pinia**.

To keep avoiding external tools, I intentionally didn't use any **UI-Kit** for the UI, not even **tailwind**.

- [API and data](#api-and-data)
- [Logic](#logic)
- [Sort and search](#sort-and-search)
- [Test](#test)
- [For the future](#for-the-future)
- [Project setup](#project-setup)

## API and data

I used **Fetch** and put the configuration file into `/configs` path. API calls are defined into `/services/api`. The response for ech API includes many details.

> It would be nicer if I used **Axios** and put the response transform layer in `interceptors`, but I tried to use external tools as less as possible. I wanted to cache API response with [TanStack](https://tanstack.com/query/v4/docs/adapters/vue-query) (Vue-Query). In that case I had to keep the whole response in cache and transform it to an smaller object each time. But with transforming response in the interceptor level, the response will be sanitized before caching.

## Logic

I put logic into **Pinia** because I found it very performant with memoization on `computed` method. and the value can be shared with other parts. In addition, logic and components are separated. Since I didn't want to keep the extra fields into the store, I transformed the response with new limited fields with models in `/stores/models` path.

## Video list

For showing video list based on their genres, I needed a list of genres first. Then I could load the relevant videos under that genre. From the performance perspective, I used **hashmap** for extracting the genres and keeping the relation of them with videos in order to reduce the complexity to `O(n)` with one loop.

## Sort and search

I used **query params** in URL to store search query and sort because of:

1. keeping the history and having the ability of checking the previous results with the back button of browser,
2. user can share the result of his search with others with sharing the URL with query params.

## Test

In order to covering a wide range of test cases, I created a MockBuilder in /mock path. Each time it generates new objects then tests will be more efficient specially in pipeline after each Push/PR. I tried to cover with unit tests for **Pinia stores**, **logics**, **models**, and plus UI component tests. I hope I could increase the test-coverage till the moment you're checking this project.

Test coverage **87%** for `/stores` including logics. But UI test is not covering a high percentage. I just added one simple UI test for **videoItem**. Unfortunately need I need more time to do it.

## For the future

- Pipeline and ci for Tests, Test coverage, lint and build
- Cache API responses with [TanStack](https://tanstack.com/query/v4/docs/adapters/vue-query) (Vue-Query)
- Lazy load for the videoList API and loading the new chunk of response when user scrolls to the end of the list. (I couldn't find pagination as a parameter of videoList API)
- Render elements which are only visible in the viewport. I know a tool for it in React [Rect-Window](https://github.com/bvaughn/react-window). (new generation: react-vtree, old generation: react-virtualized)
- Add an UI-Kit and make a better UI
- Breadcrumbs for showing the current route in the page

## Todos

- [x] Create application with the last version
- [x] Create Pages and layout
  - [x] Home page (all videos)
  - [x] Single video page
  - [x] Header
- [x] Create components with static data
  - [x] Video Item _responsive_
  - [x] Video List
  - [x] Single page components
  - [x] UI Test (nice to have)\*
- [x] API call
  - [ ] Cash with TanStack (nice to have)\*
- [ ] Logics for:
  - [x] Grouping the videos by genres
  - [x] Unit tests
  - [x] Fix types
  - [x] Sorting the videos by rating + Unit tests
  - [x] Search + Unit tests
  - [ ] more features?! (nice to have)\*
- [x] Dark/Light Theme (nice to have)\*

## Reminder

- Clean-up default files
- Check console errors
- Update main Readme file in the root for with the details of the project
- Add one Readme file per each folder to explain what is this folder for
- Mobile friendly in list, and single page
- Deploy on github-page
- It has Serries and shows. it would be nice to group them together

## Project Setup

I used **node v24.4.1**.

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
