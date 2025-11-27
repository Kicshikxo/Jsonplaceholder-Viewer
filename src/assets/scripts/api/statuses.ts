import axios from 'axios'
import type { BitrixResponse, BitrixStatus } from '~/types/bitrix'

/**
 * Получает список статусов.
 *
 * @throws {Error} Если произошла ошибка при запросе к API
 */
export async function getStatuses() {
  try {
    const response = await axios.get<BitrixResponse<BitrixStatus[]>>(
      import.meta.env.VITE_API_PATH_STATUS_LIST,
    )

    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message ?? error.message)
  }
}
