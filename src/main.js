import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import NotifyMessage from './mixins/notify-message.mixin'
import Vuelidate from 'vuelidate'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueLoading from 'vuejs-loading-plugin'
Vue.use(Vuelidate)
Vue.use(ElementUI)
Vue.use(VueLoading, { text: 'Carregando' })
Vue.config.productionTip = false
Vue.mixin({
  mixins: [NotifyMessage],
  methods: {
    async skeleton (params) {
      if (!params.noLoading) {
        this.$loading(true)
      }
      try {
        await store.dispatch(params.urlDispatch, params.params)
        if (params.messages) this.$setNotifySuccess(params.messages)
        if (params.callback) params.callback()
      } catch (errors) {
        this.$setNotifyDanger(errors)
      } finally {
        this.$loading(false)
      }
    },
    async $list (params) {
      await this.skeleton(params)
    },
    async $listFilter (params) {
      await this.skeleton(params)
    },
    async $createOrUpdate (params) {
      await this.skeleton(params)
    },
    async $remove (params) {
      await this.skeleton(params)
    }
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
