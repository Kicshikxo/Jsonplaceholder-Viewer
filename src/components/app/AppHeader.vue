<template>
  <div class="container mx-auto flex justify-between items-center w-full h-full">
    <div class="flex items-center gap-4">
      <span class="text-xl hidden sm:inline font-bold whitespace-nowrap">
        jsonplaceholder-viewer
      </span>
      <InputGroup>
        <InputGroupInput v-model="postsStore.postsFilter.title" placeholder="Поиск по постам..." />
        <InputGroupAddon align="inline-end">
          <InputGroupButton variant="secondary" @click="postsStore.fetchPosts">
            <Spinner v-if="postsStore.fetchLoading" />
            Поиск
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
    <div><ThemeSwitch /></div>
  </div>
</template>

<script lang="ts" setup>
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '~/components/ui/input-group'
import Spinner from '~/components/ui/spinner/Spinner.vue'
import usePostsStore from '~/store/posts.store'
import ThemeSwitch from './ThemeSwitch.vue'

const postsStore = usePostsStore()
</script>
