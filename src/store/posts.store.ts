import { debounce } from 'lodash'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { getPosts } from '~/assets/scripts/api/posts'
import type { Posts } from '~/types/jsonplaceholder'

export default defineStore('posts', () => {
  const posts = ref<Posts>([])
  const postsTitleFilter = ref('')
  const fetchLoading = ref(false)

  async function fetchPosts() {
    if (fetchLoading.value) return

    fetchLoading.value = true
    try {
      posts.value = await getPosts({ title: postsTitleFilter.value })
    } catch (error: any) {
      alert(error.message)
    } finally {
      fetchLoading.value = false
    }
  }

  const debouncedFetch = debounce(() => {
    fetchPosts()
  }, 300)

  watch(postsTitleFilter, () => {
    debouncedFetch()
  })

  return { posts, postsTitleFilter, fetchPosts, fetchLoading }
})
