import type { SortDirection } from '@tanstack/vue-table'
import axios from 'axios'
import type { Posts } from '~/types/jsonplaceholder'

/**
 * Получает список постов с API `/api/posts`.
 *
 * @param {Object} filter - Объект фильтрации.
 * @param {string} [filter.title] - Поиск по заголовку.
 *
 * @param {Object} sort - Объект сортировки.
 * @param {string} [sort.key] - Поле для сортировки.
 * @param {SortDirection} [sort.order] - Направление сортировки (`asc` / `desc`).
 *
 * @param {Object} params - Параметры пагинации.
 * @param {number} params.page - Номер страницы.
 * @param {number} params.perPage - Количество элементов на странице.
 *
 * @returns {Promise<Posts>} Список постов, полученный через API.
 *
 * @throws {Error} Если запрос завершился неудачно.
 */
export async function getPosts(
  filter: { title?: string } = {},
  sort: { key?: string; order?: SortDirection } = {},
  params: { page: number; perPage: number } = {
    page: 1,
    perPage: 30,
  },
): Promise<Posts> {
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
    throw new Error(error.response?.data?.message ?? error.message)
  }
}
