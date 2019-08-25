import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import localStorageMixin from './mixins/localStorageMixin'

import './index.scss'

Axios.defaults.baseURL = 'https://swapi.co/api'

Vue.config.productionTip = false

Vue.mixin(localStorageMixin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
