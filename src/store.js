// store/index.js

import { createStore } from 'vuex';
import userModule from './modules/usersData';
import loginModule from './modules/loginModule';
import quizData from './modules/quizData';

const store = createStore({
    modules: {
      userData: userModule,
      login: loginModule,
      quizData: quizData,
    },
    state: {
      showAdminLink: false,
    },
    mutations: {
    //   login(state) {
    //     state.isLoggedIn = true;
    //   },
    //   logout(state) {
    //     state.isLoggedIn = false;
    //   },
    updateNavbar(state) {
      const requiresAdmin = JSON.parse(localStorage.getItem('isAdmin'));
      state.showAdminLink = requiresAdmin;
  },
    },
    actions: {
      updateNavbar(context) {
        context.commit('updateNavbar');
    },
    //   login(context) {
    //     context.commit('login');
    //   },
    //   logout(context) {
    //     context.commit('logout');
    //   },
    },
    getters: {
      isAdmin(state) {
        return state.showAdminLink;
      }
    }
  });

  export default store;
