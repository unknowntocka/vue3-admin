<script lang="ts" setup>
import { computed } from 'vue'
import { isExternal } from '@/utils/validate'

const props = defineProps<{
  to: string
}>()

const isRouteView = computed(() => {
  return isExternal(props.to)
})

const toProps = computed(() => {
  if(isRouteView.value) {
    return {
      to: props.to
    }
  } else {
    return {
      href: props.to,
      target: '_blank',
      rel: 'noopener'
    }
  }
})

const type = computed(() => {
  if(isRouteView.value) {
    return 'router-view'
  } else {
    return 'a'
  }
})
</script>

<template>
  <component :is="type" v-bind="toProps">
    <slot />
  </component>
</template>
