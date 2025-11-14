import axios from 'axios'
import type { Users } from '~/types/jsonplaceholder'

export async function getUsers() {
  try {
    const response = await axios.get<Users>('/api/users')

    return response.data
  } catch (error: any) {
    throw new Error(error.response.data.message ?? error.message)
  }
}
