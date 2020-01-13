// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'

// import { MdButton, MdContent, MdTabs } from 'vue-material/dist/components'
// import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import router from './router'
import App from './App'

Vue.use(VueMaterial)

// Vue.use(MdContent)
// Vue.use(MdTabs)
// Vue.use(MdButton)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {
        App,
    },
    template: '<App/>',
})
