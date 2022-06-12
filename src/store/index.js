import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/Auth/auth'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

export default new Vuex.Store({   
  modules: {
    auth
  }
})
