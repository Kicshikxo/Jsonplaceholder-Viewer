<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline" size="icon">
        <component :is="colorModeIcon" class="size-4"></component>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="colorMode = 'light'"> Светлая </DropdownMenuItem>
      <DropdownMenuItem @click="colorMode = 'dark'"> Тёмная </DropdownMenuItem>
      <DropdownMenuItem @click="colorMode = 'auto'"> Системная </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script lang="ts" setup>
import { useColorMode } from '@vueuse/core'
import { CircleQuestionMark, Monitor, Moon, Sun } from 'lucide-vue-next'
import { computed } from 'vue'
import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'

const colorMode = useColorMode()

const colorModeIcon = computed(() => {
  switch (colorMode.store.value) {
    case 'auto':
      return Monitor
    case 'dark':
      return Moon
    case 'light':
      return Sun
    default:
      return CircleQuestionMark
  }
})
</script>
