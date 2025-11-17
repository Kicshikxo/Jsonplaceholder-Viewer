import type { SortDirection } from '@tanstack/vue-table'
import { debounce } from 'lodash'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { toast } from 'vue-sonner'
import { getPosts } from '~/assets/scripts/api/posts'
import type { Posts } from '~/types/jsonplaceholder'

export default defineStore('posts', () => {
  const posts = ref<Posts>([])

  const postsPagination = ref({ page: 1, perPage: 30 })
  const postsFilter = ref({
    title: '',
  })
  const postsSort = ref<{
    key: string
    order: SortDirection
  }>({
    key: 'id',
    order: 'asc',
  })

  const postsFullyLoaded = ref(false)
  const fetchLoading = ref(false)

  function resetPosts() {
    posts.value = []
    postsPagination.value.page = 1
    postsFullyLoaded.value = false
  }

  async function fetchPosts(reset = false) {
    if (fetchLoading.value || (postsFullyLoaded.value && !reset)) return

    fetchLoading.value = true
    try {
      const response = await getPosts(
        postsFilter.value,
        postsSort.value,
        reset ? { page: 1, perPage: 30 } : postsPagination.value,
      )

      if (reset) resetPosts()

      if (response?.length) {
        posts.value = [...posts.value, ...response]
        postsPagination.value.page += 1
      } else {
        postsFullyLoaded.value = true
      }
    } catch (error: any) {
      toast.error(error.message, {
        duration: Infinity,
        action: {
          label: 'Повторить',
          onClick: () => {
            fetchPosts()
          },
        },
      })
    } finally {
      fetchLoading.value = false
    }
  }

  function toggleSort(key: string) {
    if (postsSort.value.key === key) {
      postsSort.value.order = postsSort.value.order === 'asc' ? 'desc' : 'asc'
    } else {
      postsSort.value.key = key
      postsSort.value.order = 'asc'
    }
  }

  const debouncedFetch = debounce((reset: boolean) => {
    fetchPosts(reset)
  }, 300)

  watch(
    postsFilter,
    () => {
      debouncedFetch(true)
    },
    { deep: true },
  )

  watch(
    postsSort,
    () => {
      fetchPosts(true)
    },
    { deep: true },
  )

  return {
    posts,
    postsFilter,
    postsSort,
    postsFullyLoaded,
    resetPosts,
    fetchPosts,
    fetchLoading,
    toggleSort,
  }
})
