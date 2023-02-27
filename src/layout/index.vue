<script lang="ts" setup>
import AppMain from './AppMain/index.vue'
import NavBar from './Navbar/index.vue'
import SideBar from './Sidebar/index.vue'

</script>

<template>
  <div class="app-wrapper">
    <side-bar class="sidebar-container" />
    <div class="main-container">
      <nav-bar class="navbar-container" />
      <app-main />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;

  .main-container {
    margin-top: 60px;
    margin-left: 257px;

    .navbar-container {
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      z-index: 999;
    }
  }
}
</style>
