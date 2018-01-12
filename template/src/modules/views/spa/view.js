import Vue from 'vue';
import App from './App';
import router from './router';
import '@/modules/main';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
});
