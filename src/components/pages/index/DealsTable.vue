<template>
  <div class="deals-table flex flex-col justify-center items-center size-full">
    <DataTable
      :skeleton="loading"
      :columns="columns"
      :data="formattedDeals"
      :show-load-more="!dealsStore.pagination.fullyLoaded"
      @load-more="dealsStore.fetchDeals"
    />
  </div>
</template>

<script lang="ts" setup>
import type { Column, ColumnDef } from '@tanstack/vue-table'
import { ArrowDownNarrowWide, ArrowDownWideNarrow, ArrowUpDown } from 'lucide-vue-next'
import { computed, h } from 'vue'

import { Button } from '~/components/ui/button'
import DataTable from '~/components/ui/DataTable.vue'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip'

import useDealsStore from '~/store/deals.store'
import useStatusesStore from '~/store/statuses.store'
import useUsersStore from '~/store/users.store'
import type { BitrixDeal } from '~/types/bitrix'

withDefaults(
  defineProps<{
    loading?: boolean
  }>(),
  {
    loading: false,
  },
)

const dealsStore = useDealsStore()
const statusesStore = useStatusesStore()
const usersStore = useUsersStore()

const userLabel = (userId: string) => {
  const user = usersStore.users.find((user) => user.ID === userId)
  return `${user?.NAME ?? ''} ${user?.LAST_NAME ?? ''}`
}

const statusLabel = (
  statusId: string,
  statuses: typeof statusesStore.dealStageStatuses | typeof statusesStore.sourceStatuses,
) => {
  return statuses[statusId]?.NAME ?? ''
}

const formattedDeals = computed(() =>
  dealsStore.deals.map((deal) => ({
    ...deal,
    STAGE_ID: statusLabel(deal.STAGE_ID, statusesStore.dealStageStatuses),
    ASSIGNED_BY_ID: userLabel(deal.ASSIGNED_BY_ID),
    CREATED_BY_ID: userLabel(deal.CREATED_BY_ID),
    DATE_CREATE: deal.DATE_CREATE ? new Date(deal.DATE_CREATE).toLocaleString('ru') : '',
    CLOSEDATE: deal.CLOSEDATE ? new Date(deal.CLOSEDATE).toLocaleString('ru') : '',
    SOURCE_ID: deal.SOURCE_ID ? statusLabel(deal.SOURCE_ID, statusesStore.sourceStatuses) : '',
  })),
)

const sortableHeader = (column: Column<BitrixDeal, any>) => {
  const label = dealsStore.fields?.[column.id]?.title ?? column.id
  return h(
    Button,
    {
      variant: 'ghost',
      style: { padding: 0, cursor: 'pointer' },
      onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
    },
    () => [
      label,
      h(
        column.getIsSorted() === 'asc'
          ? ArrowDownNarrowWide
          : column.getIsSorted() === 'desc'
          ? ArrowDownWideNarrow
          : ArrowUpDown,
        {
          class: 'ml-2 size-4',
        },
      ),
    ],
  )
}

const cellWithTooltip = (content: string | undefined, maxWidth = '200px', onClick?: () => void) =>
  h(TooltipProvider, { delayDuration: 700 }, () =>
    h(Tooltip, {}, () => [
      h(TooltipTrigger, {}, () =>
        onClick
          ? h(
              Button,
              { size: 'sm', variant: 'ghost', style: { padding: 0, cursor: 'pointer' }, onClick },
              () => h('div', { class: 'truncate text-left', style: { maxWidth } }, content),
            )
          : h('div', { class: 'truncate text-left', style: { maxWidth } }, content),
      ),
      h(TooltipContent, {}, () => content),
    ]),
  )

const columns: ColumnDef<BitrixDeal>[] = [
  {
    accessorKey: 'ID',
    header: ({ column }) => sortableHeader(column),
    cell: (info) => cellWithTooltip(String(info.getValue() ?? ''), '100px'),
  },
  {
    accessorKey: 'TITLE',
    header: ({ column }) => sortableHeader(column),
    cell: (info) => cellWithTooltip(String(info.getValue() ?? ''), '400px'),
  },
  {
    accessorKey: 'STAGE_SEMANTIC_ID',
    header: ({ column }) => sortableHeader(column),
    cell: (info) => cellWithTooltip(String(info.getValue() ?? ''), '200px'),
  },
  {
    accessorKey: 'STAGE_ID',
    header: ({ column }) => sortableHeader(column),
    cell: (info) => cellWithTooltip(String(info.getValue()), '200px'),
  },
  {
    accessorKey: 'ASSIGNED_BY_ID',
    header: ({ column }) => sortableHeader(column),
    cell: (info) => cellWithTooltip(String(info.getValue()), '200px'),
  },
  {
    accessorKey: 'DATE_CREATE',
    header: ({ column }) => sortableHeader(column),
    cell: (info) => cellWithTooltip(String(info.getValue()), '200px'),
  },
  {
    accessorKey: 'CREATED_BY_ID',
    header: ({ column }) => sortableHeader(column),
    cell: (info) => cellWithTooltip(String(info.getValue()), '200px'),
  },
  {
    accessorKey: 'CATEGORY_ID',
    header: ({ column }) => sortableHeader(column),
    cell: (info) => cellWithTooltip(String(info.getValue() ?? ''), '200px'),
  },
  {
    accessorKey: 'CURRENCY_ID',
    header: ({ column }) => sortableHeader(column),
    cell: (info) => cellWithTooltip(String(info.getValue() ?? ''), '200px'),
  },
  {
    accessorKey: 'OPPORTUNITY',
    header: ({ column }) => sortableHeader(column),
    cell: (info) => cellWithTooltip(String(info.getValue() ?? ''), '200px'),
  },
  {
    accessorKey: 'CLOSEDATE',
    header: ({ column }) => sortableHeader(column),
    cell: (info) => cellWithTooltip(String(info.getValue()), '200px'),
  },
  {
    accessorKey: 'SOURCE_ID',
    header: ({ column }) => sortableHeader(column),
    cell: (info) => cellWithTooltip(String(info.getValue()), '200px'),
  },
  {
    accessorKey: 'UTM_SOURCE',
    header: ({ column }) => sortableHeader(column),
    cell: (info) => cellWithTooltip(String(info.getValue() ?? ''), '200px'),
  },
  {
    accessorKey: 'LEAD_ID',
    header: ({ column }) => sortableHeader(column),
    cell: (info) => cellWithTooltip(String(info.getValue() ?? ''), '200px'),
  },
]
</script>

<style lang="scss" scoped>
.deals-table {
  div[data-slot='table-container'] {
    width: 100%;
    max-height: 600px;

    border: 1px solid var(--color-border);
    border-radius: 0.25rem;
  }
}
</style>
