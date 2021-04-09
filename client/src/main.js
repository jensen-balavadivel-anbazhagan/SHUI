import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import Vuelidate from 'vuelidate';
import Vuecookies from 'vue-cookies';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(Vuecookies);

library.add(faUser)
Vue.component('font-awesome-icon', FontAwesomeIcon)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
