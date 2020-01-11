<template>
    <md-app-toolbar class="md-primary">
        <span class="md-title">My Title HomePage</span>
    </md-app-toolbar>
</template>

<script>
export default {
  name: 'AppToolbar',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted () {
    console.log('AppToolbar===')
  }
}
</script>

<style lang="scss" scoped>
.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}
</style>
