<template>
  <div
    class="flex flex-col w-screen min-w-screen max-w-screen h-dvh min-h-dvh max-h-dvh overflow-hidden"
  >
    <header class="w-full h-16 p-2 border-b border-neutral-200 dark:border-neutral-800">
      <AppHeader />
    </header>

    <main class="flex flex-1 relative overflow-y-auto overflow-x-hidden">
      <div class="absolute w-full min-h-full flex justify-center">
        <div class="container p-2 sm:p-4">
          <RouterView />
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import AppHeader from '~/components/app/AppHeader.vue'
</script>
