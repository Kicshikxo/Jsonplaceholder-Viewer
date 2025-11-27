import axios from 'axios'
import type { BitrixDeal, BitrixFields, BitrixResponse } from '~/types/bitrix'

/**
 * Получает список полей сделок.
 *
 * @throws {Error} Если произошла ошибка при запросе к API
 */
export async function getDealFields() {
  try {
    const response = await axios.get<BitrixResponse<BitrixFields>>(
      import.meta.env.VITE_API_PATH_DEALS_FIELDS,
    )

    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message ?? error.message)
  }
}

/**
 * Получает список сделок.
 *
 * @param {Object} [filter] - Фильтр для сделок
 * @param {Object} [filter.idFrom] - ID сделки от
 * @param {Object} [filter.idTo] - ID сделки до
 * @param {Object} [sort] - Сортировка для списка сделок
 * @param {Object} [sort.key] - Поле для сортировки
 * @param {Object} [sort.order] - Порядок сортировки (ASC или DESC)
 * @param {Object} [pagination] - Параметры пагинации
 * @param {Object} [pagination.start] - С какого элемента начать
 * @throws {Error} Если произошла ошибка при запросе к API
 */
export async function getDeals(
  filter: { idFrom?: number; idTo?: number } = {},
  sort: { key?: string; order?: 'ASC' | 'DESC' } = {},
  pagination: { start: number } = {
    start: 0,
  },
) {
  try {
    const response = await axios.get<BitrixResponse<BitrixDeal[]>>(
      import.meta.env.VITE_API_PATH_DEALS_LIST,
      {
        params: {
          select: [
            'ID',
            'TITLE',
            'STAGE_SEMANTIC_ID',
            'STAGE_ID',
            'ASSIGNED_BY_ID',
            'DATE_CREATE',
            'CREATED_BY_ID',
            'CATEGORY_ID',
            'CURRENCY_ID',
            'OPPORTUNITY',
            'CLOSEDATE',
            'SOURCE_ID',
            'UTM_SOURCE',
            'LEAD_ID',
          ],
          filter: {
            '>ID': filter.idFrom,
            '<ID': filter.idTo,
          },
          order: {
            [sort.key ?? '']: sort.order,
          },
          start: pagination.start,
        },
      },
    )

    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message ?? error.message)
  }
}
