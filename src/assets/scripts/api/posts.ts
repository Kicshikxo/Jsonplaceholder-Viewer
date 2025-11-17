import type { SortDirection } from '@tanstack/vue-table'
import axios from 'axios'
import type { Posts } from '~/types/jsonplaceholder'

export async function getPosts(
  filter: { title?: string } = {},
  sort: { key?: string; order?: SortDirection } = {},
  params: { page: number; perPage: number } = {
    page: 1,
    perPage: 30,
  },
) {
  try {
    const response = await axios.get<Posts>('/api/posts', {
      params: {
        _page: params.page,
        _limit: params.perPage,
        _sort: sort.key,
        _order: sort.order,
        title_like: filter.title,
      },
    })

    return response.data
  } catch (error: any) {
    throw new Error(error.response.data.message ?? error.message)
  }
}
