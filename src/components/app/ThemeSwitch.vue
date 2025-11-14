<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline" size="icon">
        <Icon :icon="colorModeIcon" class="h-4 w-4" />
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
import { Icon } from '@iconify/vue'
import { useColorMode } from '@vueuse/core'
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
      return 'radix-icons:desktop'
    case 'dark':
      return 'radix-icons:moon'
    case 'light':
      return 'radix-icons:sun'
    default:
      return 'radix-icons:question-mark-circled'
  }
})
</script>
