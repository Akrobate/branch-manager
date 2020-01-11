<template>
<!--
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed">
      <app-drawer slot='md-app-drawer' md-permanent="full"></app-drawer>
      <app-toolbar slot='md-app-toolbar'></app-toolbar>
      <router-view slot='md-app-content'></router-view>
    </md-app>
  </div>
-->
      <router-view></router-view>
</template>

<script>

import AppDrawer from '@/components/AppDrawer'
import AppToolbar from '@/components/AppToolbar'

export default {
  name: 'App',
  components: {
    AppDrawer,
    AppToolbar
  }
}

</script>

<style>
</style>
