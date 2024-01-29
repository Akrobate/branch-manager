<template>
    <md-app-drawer :md-active.sync="menuVisible" md-persistent="mini">
        <md-toolbar class="md-transparent" md-elevation="0">
            Navigation
            <div class="md-toolbar-section-end">
                <md-button class="md-icon-button md-dense" @click="toggleMenu">
                <md-icon>keyboard_arrow_left</md-icon>
                </md-button>
          </div>
        </md-toolbar>

        <md-list>
            <md-list-item @click="toggleMenu" v-if="!menuVisible">
                <md-icon>menu</md-icon>
                <span class="md-list-item-text">Menu</span>
            </md-list-item>

            <md-list-item :to="{ name: 'HomePage'}" exact>
                <md-icon>home</md-icon>
                <span class="md-list-item-text">Home</span>
            </md-list-item>

            <md-list-item :to="{ name: 'ProjectsPage'}">
                <md-icon>assignment</md-icon>
                <span class="md-list-item-text">Projects</span>
            </md-list-item>

            <md-list-item :to="{ name: 'CredentialsPage'}">
                <md-icon>settings_applications</md-icon>
                <span class="md-list-item-text">Settings</span>
            </md-list-item>

            <md-list-item>
                <md-icon>help</md-icon>
                <span class="md-list-item-text">About</span>
            </md-list-item>
        </md-list>
    </md-app-drawer>
</template>

<script>
export default {
    name: 'AppDrawer',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App',
            menuVisible: false,
        }
    },
    mounted() {
        console.log('AppDrawer')
    },
    methods: {
        toggleMenu() {
            this.menuVisible = !this.menuVisible
        },
    },
}
</script>

<style lang="scss" scoped>
.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}
</style>
