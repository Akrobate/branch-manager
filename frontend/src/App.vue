<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed">
      <app-drawer slot='md-app-drawer'></app-drawer>
      <app-toolbar slot='md-app-toolbar'></app-toolbar>
      <md-app-content>
        <router-view></router-view>
      </md-app-content>
    </md-app>
  </div>
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

<style lang="scss" scoped>
.md-app {
  height: 100vh;
}

.md-app-content {
  height: auto;
}

</style>
