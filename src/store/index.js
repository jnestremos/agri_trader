import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/Auth/auth'
import farm from './modules/Farm/farm'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

export default new Vuex.Store({  
  state: {
    loading: false
  },
  actions: {
    readyApp({ commit }){
      setTimeout(() => {
        commit('appReady')
      }, 2000)
      return Promise.resolve('success')
    }
  },
  mutations: {
    appReady: (state) => {
      state.loading = true
    }
  },
  modules: {
    auth,
    farm
  },
})
