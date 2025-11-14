import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUsers } from '~/assets/scripts/api/users'
import type { Users } from '~/types/jsonplaceholder'

export default defineStore('users', () => {
  const users = ref<Users>([])

  async function fetchUsers() {
    users.value = await getUsers()
  }

  return { users, fetchUsers }
})
