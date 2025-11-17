import { defineStore } from 'pinia'
import { ref } from 'vue'
import { toast } from 'vue-sonner'
import { getUsers } from '~/assets/scripts/api/users'
import type { Users } from '~/types/jsonplaceholder'

export default defineStore('users', () => {
  const users = ref<Users>([])
  const fetchLoading = ref(false)

  async function fetchUsers() {
    if (fetchLoading.value) return

    fetchLoading.value = true
    try {
      users.value = await getUsers()
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
