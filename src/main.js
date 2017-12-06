// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'

import Vuetify from 'vuetify'
import './stylus/main.styl'
import * as firebase from 'firebase'
import App from './App'
import router from './router'
import { store } from './store'
import { DateFilter, SimpleDate } from './filters/date'
import DatetimePicker from './components/shared/datetimePicker'
import AlertCmp from './components/shared/Alert'
import SetInfo from './components/shared/SetInfo'
import Totem from './components/shared/Totem'

Vue.use(Vuetify)
// Vue.use(VueAwesomeSwiper)


Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.filter('simple', SimpleDate)
/* eslint-disable no-new */
Vue.component('v-datetime-picker', DatetimePicker)
Vue.component('app-alert', AlertCmp)
Vue.component('set-info', SetInfo)
// Vue.component('swiper', VueAwesomeSwiper)
Vue.component('vertical-ticker', Totem)


new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created () {
    firebase.initializeApp({
      apiKey: "AIzaSyBsPlkURJFlJ3YDZHgCQfDOrDzAWQhtpCo",
      authDomain: "schoolsite-info.firebaseapp.com",
      databaseURL: "https://schoolsite-info.firebaseio.com",
      projectId: "schoolsite-info",
      storageBucket: "schoolsite-info.appspot.com",
      messagingSenderId: "183437324389"
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadInfos')
  }
})
