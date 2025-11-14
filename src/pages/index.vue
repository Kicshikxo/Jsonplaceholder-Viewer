<template>
  <div class="flex flex-col justify-center items-center w-full h-full">
    <Spinner v-if="!postsStore.posts.length && postsStore.fetchLoading" />

    <PostsList />
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import PostsList from '~/components/pages/index/PostsList.vue'
import Spinner from '~/components/ui/spinner/Spinner.vue'
import usePostsStore from '~/store/posts.store'
import useUsersStore from '~/store/users.store'

const usersStore = useUsersStore()
const postsStore = usePostsStore()

onMounted(() => {
  usersStore.fetchUsers()
  postsStore.fetchPosts()
})
</script>
