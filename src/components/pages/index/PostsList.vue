<template>
  <div class="overflow-auto">
    <div class="max-w-[600px] max-h-[600px]">
      <div v-for="post in postsStore.posts">
        {{ post }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import usePostsStore from '~/store/posts.store'

const postsStore = usePostsStore()
</script>
