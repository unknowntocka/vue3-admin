<script lang="ts" setup>
import { computed, ref } from 'vue'
import { IconPark } from '@icon-park/vue-next/es/all'
import type {CustomRoute} from '@/router/index'
import { isExternal } from '@/utils/validate'
import Item from './Item.vue'
import { useRouter } from 'vue-router'
import path from 'path-browserify'

interface Props {
  item: CustomRoute,
  isNest?: boolean,
  basePath: string
}

const props = withDefaults(defineProps<Props>(), {
  isNest: false,
  basePath: ''
})

const routeInfo = computed(() => {
  return props.item
})

const onlyOneChild = ref<CustomRoute & {
  noShowingChildren?: boolean
}>()

const hasOneShowingChild = (children: CustomRoute[] = [], parent: CustomRoute) => {
  const showingChildren = children.filter((item) => {
    if (item.hidden) {
      return false
    } else {
      onlyOneChild.value = item
      return true
    }
  })

  if (showingChildren.length === 1) {
    return true
  }

  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
    return true
  }

  return false
}

const resolvePath = (routePath: string) => {
  if (isExternal(routePath)) {
    return routePath
  }
  if (isExternal(props.basePath)) {
    return props.basePath
  }
  return path.resolve(props.basePath, routePath)
}

</script>

<template>
  <div v-if="!routeInfo.hidden">
    <template v-if="hasOneShowingChild(routeInfo.children, routeInfo) && (!onlyOneChild?.children || onlyOneChild.noShowingChildren)">
      <el-menu-item :index="resolvePath(onlyOneChild?.path as string)">
        <item :title="(onlyOneChild?.meta?.title as string)" :icon="((onlyOneChild?.meta?.icon || routeInfo.meta?.icon) as string)"></item>
      </el-menu-item>
    </template>
    <el-sub-menu v-else :index="resolvePath(routeInfo.path)">
      <template #title>
        <item v-if="routeInfo.meta" :title="(routeInfo.meta.title as string)" :icon="(routeInfo.meta.icon as string)" ></item>
      </template>
      <sidebar-item
        v-for="child in routeInfo.children"
        :key="child.path"
        :item="child"
        :is-nest="true"
        :base-path="resolvePath(child.path)"
      />
    </el-sub-menu>
  </div>
</template>

<style lang="scss" scoped>

</style>
