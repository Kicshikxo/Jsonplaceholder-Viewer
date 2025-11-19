import axios from 'axios'
import type { Users } from '~/types/jsonplaceholder'

/**
 * Получает список пользователей с API `/api/users`.
 *
 * @returns {Promise<Users>} Данные пользователей.
 * @throws {Error} Если сервер вернул ошибку или запрос не удался.
 */
export async function getUsers() {
  try {
    const response = await axios.get<Users>('/api/users')

    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message ?? error.message)
  }
}
