import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex);

export interface RootState {
    data: string;
}

import moduleWord from './word.store';
import moduleUser from './user.store';
import modulePage from './page.store';

const store: StoreOptions<RootState> = {
  modules: {
    moduleWord,
    moduleUser,
    modulePage,
  },
  state: {
    data: 'root',
  },
  mutations: {
    setData (state, data: string) {
      state.data = data;
    },
  },
 actions: {
    setRootData ({commit}, data: string) {
      commit('setData', data);
    },
  },
  getters: {
    data: (state) => state.data,
  },
  plugins: [
    createPersistedState()
  ]
};
const vuex = () => new Vuex.Store(store);
export default vuex;