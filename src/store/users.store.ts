import { defineStore } from 'pinia'
import { ref } from 'vue'
import { toast } from 'vue-sonner'
import { getUsers } from '~/assets/scripts/api/users'
import type { BitrixUser } from '~/types/bitrix'

export default defineStore('users', () => {
  const users = ref<BitrixUser[]>([])

  const fetchLoading = ref(false)
  async function fetchUsers() {
    if (fetchLoading.value) return

    fetchLoading.value = true
    try {
      const { result } = await getUsers()
      users.value = result
    } catch (error: any) {
      toast.error(error.message, {
        duration: Infinity,
        action: {
          label: 'Повторить',
          onClick: () => {
            fetchUsers()
          },
        },
      })
    } finally {
      fetchLoading.value = false
    }
  }

  return { users, fetchUsers }
})
