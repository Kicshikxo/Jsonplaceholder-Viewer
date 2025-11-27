import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { toast } from 'vue-sonner'
import { getStatuses } from '~/assets/scripts/api/statuses'
import type { BitrixStatus } from '~/types/bitrix'

export default defineStore('statuses', () => {
  const statuses = ref<BitrixStatus[]>([])
  const dealStageStatuses = computed<BitrixStatus[]>(() =>
    statuses.value.filter((status) => status.ENTITY_ID === 'DEAL_STAGE'),
  )
  const sourceStatuses = computed<BitrixStatus[]>(() =>
    statuses.value.filter((status) => status.ENTITY_ID === 'SOURCE'),
  )

  const fetchLoading = ref(false)

  async function fetchStatuses() {
    if (fetchLoading.value) return

    fetchLoading.value = true
    try {
      const { result } = await getStatuses()
      statuses.value = result
    } catch (error: any) {
      toast.error(error.message, {
        duration: Infinity,
        action: {
          label: 'Повторить',
          onClick: () => {
            fetchStatuses()
          },
        },
      })
    } finally {
      fetchLoading.value = false
    }
  }

  return { statuses, dealStageStatuses, sourceStatuses, fetchStatuses }
})
