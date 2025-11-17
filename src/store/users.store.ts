import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { toast } from 'vue-sonner'
import { getUsers } from '~/assets/scripts/api/users'
import type { Users } from '~/types/jsonplaceholder'

export const OPENED_USERS_KEY = 'openedUsers'

export default defineStore('users', () => {
  const users = ref<Users>([])
  const openedUsers = ref<Set<number>>(new Set())

  const fetchLoading = ref(false)

  const storedOpenedUsers = localStorage.getItem(OPENED_USERS_KEY)
  if (storedOpenedUsers) {
    try {
      openedUsers.value = new Set(JSON.parse(storedOpenedUsers))
    } catch (error: any) {
      localStorage.removeItem(OPENED_USERS_KEY)
      toast.error(error.message)
    }
  }

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

  watch(
    openedUsers,
    () => {
      localStorage.setItem(OPENED_USERS_KEY, JSON.stringify([...openedUsers.value]))
    },
    { deep: true },
  )

  return { users, openedUsers, fetchUsers }
})
