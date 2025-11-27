import axios from 'axios'
import type { BitrixResponse, BitrixUser } from '~/types/bitrix'

/**
 * Получает список пользователей.
 *
 * @throws {Error} Если произошла ошибка при запросе к API
 */
export async function getUsers() {
  try {
    const response = await axios.get<BitrixResponse<BitrixUser[]>>(
      import.meta.env.VITE_API_PATH_USERS_LIST,
    )

    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message ?? error.message)
  }
}
