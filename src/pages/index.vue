<template>
  <div class="flex flex-col justify-center items-center w-full h-full">
    <Spinner v-if="!postsStore.posts.length && postsStore.fetchLoading" />

    <PostsTable v-else @open-user-dialog="handleOpenUserDialog" />

    <Dialog v-model:open="userDialog.open">
      <DialogContent class="max-w-md">
        <DialogHeader>
          <DialogTitle>Информация о пользователе</DialogTitle>
        </DialogHeader>

        <div class="flex flex-col">
          <Item
            v-if="userDialog.user?.name"
            variant="outline"
            class="rounded-none first:rounded-t-md last:rounded-b-md p-2"
          >
            <ItemContent>
              <ItemTitle>Имя</ItemTitle>
              <ItemDescription>{{ userDialog.user.name }}</ItemDescription>
            </ItemContent>
          </Item>

          <Item
            v-if="userDialog.user?.username"
            variant="outline"
            class="rounded-none first:rounded-t-md last:rounded-b-md p-2"
          >
            <ItemContent>
              <ItemTitle>Логин</ItemTitle>
              <ItemDescription>{{ userDialog.user.username }}</ItemDescription>
            </ItemContent>
          </Item>

          <Item
            v-if="userDialog.user?.email"
            variant="outline"
            class="rounded-none first:rounded-t-md last:rounded-b-md p-2"
          >
            <ItemContent>
              <ItemTitle>Email</ItemTitle>
              <ItemDescription>{{ userDialog.user.email }}</ItemDescription>
            </ItemContent>
          </Item>

          <Item
            v-if="userDialog.user?.phone"
            variant="outline"
            class="rounded-none first:rounded-t-md last:rounded-b-md p-2"
          >
            <ItemContent>
              <ItemTitle>Телефон</ItemTitle>
              <ItemDescription>{{ userDialog.user.phone }}</ItemDescription>
            </ItemContent>
          </Item>

          <Item
            v-if="userDialog.user?.website"
            variant="outline"
            class="rounded-none first:rounded-t-md last:rounded-b-md p-2"
          >
            <ItemContent>
              <ItemTitle>Веб-сайт</ItemTitle>
              <ItemDescription>
                <a :href="`https://${userDialog.user.website}`" target="_blank">
                  {{ userDialog.user.website }}
                </a>
              </ItemDescription>
            </ItemContent>
          </Item>

          <Item
            v-if="userDialog.user?.company?.name"
            variant="outline"
            class="rounded-none first:rounded-t-md last:rounded-b-md p-2"
          >
            <ItemContent>
              <ItemTitle>Компания</ItemTitle>
              <ItemDescription>{{ userDialog.user.company.name }}</ItemDescription>
            </ItemContent>
          </Item>

          <Item
            v-if="userDialog.user?.address"
            variant="outline"
            class="rounded-none first:rounded-t-md last:rounded-b-md p-2"
          >
            <ItemContent>
              <ItemTitle>Адрес</ItemTitle>
              <ItemDescription>
                {{ userDialog.user.address.street }}, {{ userDialog.user.address.suite }},
                {{ userDialog.user.address.city }}
              </ItemDescription>
            </ItemContent>
          </Item>
        </div>

        <DialogFooter>
          <Button @click="userDialog.open = false">Закрыть</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

import PostsTable from '~/components/pages/index/PostsTable.vue'
import Button from '~/components/ui/button/Button.vue'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'
import { Item, ItemContent, ItemDescription, ItemTitle } from '~/components/ui/item'
import Spinner from '~/components/ui/spinner/Spinner.vue'

import usePostsStore from '~/store/posts.store'
import useUsersStore from '~/store/users.store'
import type { User } from '~/types/jsonplaceholder'

const usersStore = useUsersStore()
const postsStore = usePostsStore()

onMounted(() => {
  usersStore.fetchUsers()
  postsStore.fetchPosts()
})

const userDialog = ref<{
  open: boolean
  user: User | null
}>({
  open: false,
  user: null,
})

function handleOpenUserDialog(user: User | null) {
  if (user) {
    usersStore.openedUsers.add(user.id)
    userDialog.value.user = user
    userDialog.value.open = true
  }
}
</script>
