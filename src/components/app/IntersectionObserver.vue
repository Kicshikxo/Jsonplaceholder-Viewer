<template>
  <div ref="element" class="w-full"></div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    root?: Element | Document | null
    rootMargin?: string
    threshold?: number | number[]
  }>(),
  {
    root: null,
    rootMargin: '200px',
    threshold: 0,
  },
)

const emit = defineEmits<{
  intersect: []
}>()

const element = ref<HTMLElement | null>(null)
const observer = ref<IntersectionObserver | null>(null)

onMounted(() => {
  observer.value = new IntersectionObserver(([entry]) => {
    if (entry?.isIntersecting) {
      emit('intersect')
    }
  }, props)

  if (element.value) observer.value.observe(element.value)
})

onBeforeUnmount(() => {
  if (observer) observer.value?.disconnect()
})
</script>
