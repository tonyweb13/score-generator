
"use strict"

import Vue from 'vue'
import App from '@/app.vue'
import { ClientTable } from 'vue-tables-2'

Vue.prototype.$bus = new Vue()
Vue.use(ClientTable)

new Vue({
    render: h => h(App),
}).$mount('#score-app')