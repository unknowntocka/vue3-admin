<script lang="ts" setup>
import { IconPark } from '@icon-park/vue-next/es/all'
defineProps<{
  icon: string
  title: string
}>()
</script>

<template>
  <div class="route-item">
    <icon-park class="router-icon" :type="icon" theme="filled" />
    <span class="router-title">{{ title }}</span>
  </div>
</template>

<style lang="scss" scoped>
.route-item {
  .router-icon {
    margin-right: 20px;
    font-size: 24px;
    vertical-align: middle;
  }

  .router-title {
    vertical-align: middle;
  }
}
</style>
