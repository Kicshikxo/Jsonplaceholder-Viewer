import { debounce } from 'lodash'
import { defineStore } from 'pinia'
import { reactive, ref, watch } from 'vue'
import { toast } from 'vue-sonner'
import { getDealFields, getDeals } from '~/assets/scripts/api/deals'
import type { BitrixDeal, BitrixFields } from '~/types/bitrix'

export default defineStore('deals', () => {
  const deals = ref<BitrixDeal[]>([])
  const fields = ref<BitrixFields>({})

  const pagination = reactive({ start: 0, fullyLoaded: false })
  const filter = reactive({
    idFrom: 2,
    idTo: 23560,
  })
  const sort = reactive<{
    key: string
    order: 'ASC' | 'DESC'
  }>({
    key: 'ID',
    order: 'ASC',
  })

  const fetchLoading = ref(false)

  function resetDeals() {
    deals.value = []
    pagination.start = 0
    pagination.fullyLoaded = false
  }

  async function fetchFields() {
    console.log('fetch')
    try {
      const { result } = await getDealFields()
      fields.value = result
    } catch (error: any) {
      toast.error(error.message, {
        duration: Infinity,
        action: {
          label: 'Повторить',
          onClick: () => {
            fetchFields()
          },
        },
      })
    }
  }

  async function fetchDeals(reset = false) {
    if (fetchLoading.value || (pagination.fullyLoaded && !reset)) return

    fetchLoading.value = true
    try {
      const { result, next } = await getDeals(filter, sort, pagination)

      if (reset) resetDeals()

      if (result.length) {
        deals.value = [...deals.value, ...result]
      }

      if (next) {
        pagination.start = next
      } else {
        pagination.fullyLoaded = true
      }
    } catch (error: any) {
      toast.error(error.message, {
        duration: Infinity,
        action: {
          label: 'Повторить',
          onClick: () => {
            fetchDeals()
          },
        },
      })
    } finally {
      fetchLoading.value = false
    }
  }

  function toggleSort(key: string) {
    if (sort.key === key) {
      sort.order = sort.order === 'ASC' ? 'DESC' : 'ASC'
    } else {
      sort.key = key
      sort.order = 'ASC'
    }
  }

  const debouncedFetch = debounce((reset: boolean) => {
    fetchDeals(reset)
  }, 300)

  watch(
    filter,
    () => {
      debouncedFetch(true)
    },
    { deep: true },
  )

  watch(
    sort,
    () => {
      fetchDeals(true)
    },
    { deep: true },
  )

  return {
    deals,
    fields,
    filter,
    sort,
    pagination,
    resetDeals,
    fetchDeals,
    fetchFields,
    fetchLoading,
    toggleSort,
  }
})
