<template>
  <div class="posts-table flex flex-col justify-center items-center size-full">
    <DataTable
      :columns="columns"
      :data="postsStore.posts"
      :show-load-more="!postsStore.postsFullyLoaded"
      @load-more="postsStore.fetchPosts"
    />
  </div>
</template>

<script lang="ts" setup>
import type { ColumnDef } from '@tanstack/vue-table'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-vue-next'
import { h } from 'vue'

import Button from '~/components/ui/button/Button.vue'
import DataTable from '~/components/ui/DataTable.vue'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip'

import usePostsStore from '~/store/posts.store'
import useUsersStore from '~/store/users.store'
import type { Post, User } from '~/types/jsonplaceholder'

const emits = defineEmits<{
  'open-user-dialog': [user: User | null]
}>()

const usersStore = useUsersStore()
const postsStore = usePostsStore()

function sortableHeader(label: string, columnId: string) {
  return h(
    Button,
    {
      variant: 'ghost',
      onClick: () => {
        if (postsStore.fetchLoading) return
        postsStore.toggleSort(columnId)
        postsStore.fetchPosts(true)
      },
    },
    () => [
      label,
      h(
        postsStore.postsSort.key === columnId
          ? postsStore.postsSort.order === 'asc'
            ? ArrowDown
            : ArrowUp
          : ArrowUpDown,
        { class: 'ml-2 size-4' },
      ),
    ],
  )
}

function cellWithTooltip(
  content: string | undefined,
  maxWidth: string,
  openedBefore = false,
  onClick?: () => void,
) {
  return h(TooltipProvider, { delayDuration: 700 }, () =>
    h(Tooltip, {}, () => [
      h(TooltipTrigger, {}, () =>
        onClick
          ? h(
              Button,
              {
                size: 'sm',
                variant: 'ghost',
                class: `cursor-pointer ${openedBefore ? 'text-neutral-400' : ''}`,
                onClick,
              },
              () => h('div', { class: `truncate text-left`, style: { maxWidth } }, content),
            )
          : h('div', { class: `truncate text-left`, style: { maxWidth } }, content),
      ),
      h(TooltipContent, {}, () => content),
    ]),
  )
}

const columns: ColumnDef<Post>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => sortableHeader('id', column.id),
    cell: (info) => cellWithTooltip(String(info.getValue()), '100px'),
  },
  {
    accessorKey: 'title',
    header: ({ column }) => sortableHeader('Заголовок', column.id),
    cell: (info) => cellWithTooltip(String(info.getValue()), '300px'),
  },
  {
    accessorKey: 'userId',
    header: ({ column }) => sortableHeader('Автор', column.id),
    cell: (info) => {
      const user = usersStore.users.find((u) => u.id === info.getValue())
      const openedBefore = user?.id ? usersStore.openedUsers.has(user.id) : false

      return cellWithTooltip(user?.email, '200px', openedBefore, () => {
        emits('open-user-dialog', user ?? null)
      })
    },
  },
  {
    accessorKey: 'body',
    header: ({ column }) => sortableHeader('Контент', column.id),
    cell: (info) => cellWithTooltip(String(info.getValue()), '400px'),
  },
]
</script>

<style lang="scss" scoped>
.posts-table {
  div[data-slot='table-container'] {
    max-width: 600px;
    max-height: 600px;

    border: 1px solid var(--color-border);
    border-radius: 0.25rem;
  }
}
</style>
