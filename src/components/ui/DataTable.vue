<template>
  <Table>
    <TableHeader>
      <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
        <TableHead
          v-for="header in headerGroup.headers"
          :key="header.id"
          class="bg-neutral-100 dark:bg-neutral-800 sticky top-0 z-10"
        >
          <FlexRender
            v-if="!header.isPlaceholder"
            :render="header.column.columnDef.header"
            :props="header.getContext()"
          />
        </TableHead>
      </TableRow>
    </TableHeader>

    <TableBody>
      <template v-if="skeleton">
        <TableRow v-for="row in 20" :key="row" class="h-12">
          <TableCell v-for="cell in table.getAllColumns()" :key="cell.id">
            <Skeleton class="h-5" />
          </TableCell>
        </TableRow>
      </template>
      <template v-else-if="table.getRowModel().rows?.length">
        <TableRow
          v-for="row in table.getRowModel().rows"
          :key="row.id"
          :data-state="row.getIsSelected() ? 'selected' : undefined"
        >
          <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
            <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
          </TableCell>
        </TableRow>

        <template v-if="showLoadMore">
          <TableRow v-for="row in 3" :key="row" class="h-12">
            <TableCell v-for="cell in table.getAllColumns()" :key="cell.id">
              <Skeleton class="h-5" />
            </TableCell>
          </TableRow>

          <TableRow v-if="showLoadMore">
            <td :colspan="table.getAllColumns().length">
              <IntersectionObserver @intersect="emits('load-more')" />
            </td>
          </TableRow>
        </template>
      </template>
      <template v-else>
        <TableRow>
          <TableCell :colspan="columns.length" class="h-24 text-center">
            Ничего не найдено
          </TableCell>
        </TableRow>
      </template>
    </TableBody>
  </Table>
</template>

<script setup lang="ts" generic="TData, TValue">
import type { ColumnDef, SortingState } from '@tanstack/vue-table'
import { FlexRender, getCoreRowModel, getSortedRowModel, useVueTable } from '@tanstack/vue-table'
import { ref } from 'vue'

import IntersectionObserver from '~/components/app/IntersectionObserver.vue'
import { Skeleton } from '~/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'

const props = withDefaults(
  defineProps<{
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    skeleton?: boolean
    showLoadMore?: boolean
  }>(),
  {
    skeleton: false,
    showLoadMore: false,
  },
)
const emits = defineEmits<{
  'load-more': []
}>()

const sorting = ref<SortingState>([])

const table = useVueTable({
  get data() {
    return props.data
  },
  get columns() {
    return props.columns
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  state: {
    get sorting() {
      return sorting.value
    },
  },
})
</script>
