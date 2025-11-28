<template>
  <div class="deals-table flex flex-col justify-center items-center size-full">
    <DataTable
      :skeleton="loading"
      :columns="columns"
      :data="dealsStore.deals"
      :show-load-more="!dealsStore.pagination.fullyLoaded"
      @load-more="dealsStore.fetchDeals"
    />
  </div>
</template>

<script lang="ts" setup>
import type { ColumnDef } from '@tanstack/vue-table'
import { ArrowDownNarrowWide, ArrowDownWideNarrow, ArrowUpDown } from 'lucide-vue-next'
import { h } from 'vue'

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

const sortableHeader = (columnId: string) => {
  const label = dealsStore.fields?.[columnId]?.title ?? columnId
  return h(
    Button,
    {
      variant: 'ghost',
      onClick: () => {
        if (dealsStore.fetchLoading) return
        dealsStore.toggleSort(columnId)
        dealsStore.fetchDeals(true)
      },
    },
    () => [
      label,
      h(
        dealsStore.sort.key === columnId
          ? dealsStore.sort.order === 'ASC'
            ? ArrowDownNarrowWide
            : ArrowDownWideNarrow
          : ArrowUpDown,
        { class: 'ml-2 size-4' },
      ),
    ],
  )
}

const cellWithTooltip = (content: string | undefined, maxWidth = '200px', onClick?: () => void) =>
  h(TooltipProvider, { delayDuration: 700 }, () =>
    h(Tooltip, {}, () => [
      h(TooltipTrigger, {}, () =>
        onClick
          ? h(Button, { size: 'sm', variant: 'ghost', class: 'cursor-pointer', onClick }, () =>
              h('div', { class: 'truncate text-left', style: { maxWidth } }, content),
            )
          : h('div', { class: 'truncate text-left', style: { maxWidth } }, content),
      ),
      h(TooltipContent, {}, () => content),
    ]),
  )

const userLabel = (userId: string) => {
  const user = usersStore.users.find((user) => user.ID === userId)
  return `${user?.NAME ?? ''} ${user?.LAST_NAME ?? ''}`
}

const statusLabel = (
  statusId: string | undefined,
  statuses: typeof statusesStore.dealStageStatuses,
) => {
  return statuses.find((status) => status.STATUS_ID === statusId)?.NAME ?? ''
}

const columns: ColumnDef<BitrixDeal>[] = [
  {
    accessorKey: 'ID',
    header: ({ column }) => sortableHeader(column.id),
    cell: (info) => cellWithTooltip(String(info.getValue() ?? ''), '100px'),
  },
  {
    accessorKey: 'TITLE',
    header: ({ column }) => sortableHeader(column.id),
    cell: (info) => cellWithTooltip(String(info.getValue() ?? ''), '400px'),
  },
  {
    accessorKey: 'STAGE_SEMANTIC_ID',
    header: ({ column }) => sortableHeader(column.id),
    cell: (info) => cellWithTooltip(String(info.getValue() ?? ''), '200px'),
  },
  {
    accessorKey: 'STAGE_ID',
    header: ({ column }) => sortableHeader(column.id),
    cell: (info) =>
      cellWithTooltip(
        statusLabel(String(info.getValue()), statusesStore.dealStageStatuses),
        '200px',
      ),
  },
  {
    accessorKey: 'ASSIGNED_BY_ID',
    header: ({ column }) => sortableHeader(column.id),
    cell: (info) => cellWithTooltip(userLabel(String(info.getValue())), '200px'),
  },
  {
    accessorKey: 'DATE_CREATE',
    header: ({ column }) => sortableHeader(column.id),
    cell: (info) =>
      cellWithTooltip(
        info.getValue() ? new Date(String(info.getValue())).toLocaleString('ru') : '',
        '200px',
      ),
  },
  {
    accessorKey: 'CREATED_BY_ID',
    header: ({ column }) => sortableHeader(column.id),
    cell: (info) => cellWithTooltip(userLabel(String(info.getValue())), '200px'),
  },
  {
    accessorKey: 'CATEGORY_ID',
    header: ({ column }) => sortableHeader(column.id),
    cell: (info) => cellWithTooltip(String(info.getValue() ?? ''), '200px'),
  },
  {
    accessorKey: 'CURRENCY_ID',
    header: ({ column }) => sortableHeader(column.id),
    cell: (info) => cellWithTooltip(String(info.getValue() ?? ''), '200px'),
  },
  {
    accessorKey: 'OPPORTUNITY',
    header: ({ column }) => sortableHeader(column.id),
    cell: (info) => cellWithTooltip(String(info.getValue() ?? ''), '200px'),
  },
  {
    accessorKey: 'CLOSEDATE',
    header: ({ column }) => sortableHeader(column.id),
    cell: (info) =>
      cellWithTooltip(
        info.getValue() ? new Date(String(info.getValue())).toLocaleString('ru') : '',
        '200px',
      ),
  },
  {
    accessorKey: 'SOURCE_ID',
    header: ({ column }) => sortableHeader(column.id),
    cell: (info) =>
      cellWithTooltip(statusLabel(String(info.getValue()), statusesStore.sourceStatuses), '200px'),
  },
  {
    accessorKey: 'UTM_SOURCE',
    header: ({ column }) => sortableHeader(column.id),
    cell: (info) => cellWithTooltip(String(info.getValue() ?? ''), '200px'),
  },
  {
    accessorKey: 'LEAD_ID',
    header: ({ column }) => sortableHeader(column.id),
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
