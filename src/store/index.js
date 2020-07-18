import Vue from 'vue'
import Vuex from 'vuex'
import User from '../pages/users/store'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    User
  }
})
