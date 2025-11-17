<template>
  <div class="container mx-auto flex justify-between items-center w-full h-full">
    <div class="flex items-center gap-4">
      <div class="flex justify-center items-center gap-2">
        <Braces />
        <span class="text-xl hidden sm:inline font-semibold whitespace-nowrap">
          jsonplaceholder-viewer
        </span>
      </div>
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
import { Braces } from 'lucide-vue-next'
import ThemeSwitch from '~/components/app/ThemeSwitch.vue'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '~/components/ui/input-group'
import Spinner from '~/components/ui/spinner/Spinner.vue'
import usePostsStore from '~/store/posts.store'

const postsStore = usePostsStore()
</script>
