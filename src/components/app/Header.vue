<template>
  <div class="container mx-auto flex justify-between items-center gap-2 w-full h-full">
    <div class="flex items-center gap-2 sm:gap-4">
      <div class="flex justify-center items-center gap-2">
        <Bot />
        <span class="text-xl hidden sm:inline font-semibold whitespace-nowrap">
          Отчёт по сделкам
        </span>
      </div>
      <div class="flex justify-center items-center gap-2">
        <div>Фильтр</div>

        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>ID от</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput type="number" v-model.trim="dealsStore.filter.idFrom" placeholder="2" />
        </InputGroup>

        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>ID до</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput
            type="number"
            v-model.trim="dealsStore.filter.idTo"
            placeholder="23560"
          />
        </InputGroup>

        <Button variant="secondary" @click="dealsStore.fetch">
          <div class="flex items-center">
            <Spinner v-if="dealsStore.fetchLoading" class="mr-1" />
            <span>Поиск</span>
          </div>
        </Button>
      </div>
    </div>

    <div><ThemeSwitch /></div>
  </div>
</template>

<script lang="ts" setup>
import { Bot } from 'lucide-vue-next'
import ThemeSwitch from '~/components/app/ThemeSwitch.vue'
import { Button } from '~/components/ui/button'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '~/components/ui/input-group'
import { Spinner } from '~/components/ui/spinner'

import useDealsStore from '~/store/deals.store'

const dealsStore = useDealsStore()
</script>
