<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import SidebarItem from './SidebarItem.vue'
import type {CustomRoute} from '@/router/index'
const router = useRouter()
const routes = computed(() => {
  return router.options.routes as CustomRoute[]
})

</script>

<template>
  <div class="sidebar">
    <el-scrollbar>
      <el-menu>
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path"></sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  position: absolute;
  width: 257px;
  height: 100vh;
  border-right: 1px solid var(--border-color);

  :deep(.el-menu) {
    border-right: none;
  }
}
</style>
