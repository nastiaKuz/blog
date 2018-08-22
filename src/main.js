// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require('./bootstrap');
import Vue from 'vue'
import Main from './components/Main.vue'
import router from './router'
import Vuex from 'vuex'
import storeData from './store'
import Api from "./services/Api"
import {setAuthorization} from './helpers/auth'


Vue.config.productionTip = false;

Vue.use(Vuex);
const store = new Vuex.Store(storeData);

function initialize(_store, _router) {
  _router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const currentAuthor = store.getters.currentAuthor;

    if (!currentAuthor && requiresAuth) {
      next('/');
    }
     else if(to.path=='/' && currentAuthor) {
      next('/posts');
    } else {
      next();
    }
  });
  Api().interceptors.response.use(null, (error) => {
    if (error.resposne.status == 401) {
      store.commit('logout');
      router.push('/login');
    }

    return Promise.reject(error);
  });

  if (store.getters.currentAuthor) {
    setAuthorization(store.getters.currentAuthor.token);
  }
}

initialize(storeData, router);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { Main },
  template: '<Main/>'
});
