<template>
  <div class="flex flex-col justify-center items-center w-full h-full">
    <DealsTable :loading="initialLoading" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

import DealsTable from '~/components/pages/index/DealsTable.vue'

import useDealsStore from '~/store/deals.store'
import useStatusesStore from '~/store/statuses.store'
import useUsersStore from '~/store/users.store'

const dealsStore = useDealsStore()
const statusesStore = useStatusesStore()
const usersStore = useUsersStore()

const initialLoading = ref(true)

onMounted(() => {
  Promise.all([
    dealsStore.fetchFields(),
    statusesStore.fetchStatuses(),
    usersStore.fetchUsers(),
    dealsStore.fetchDeals(),
  ]).finally(() => {
    initialLoading.value = false
  })
})
</script>
