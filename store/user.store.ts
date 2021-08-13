import { RootState } from './index';
import { Module, ActionContext } from 'vuex';
import AxiosService from '@/services/server.service';

export interface moduleUserState {
    email: string;
    nickname: string;
    loginState: Boolean;
}

const moduleUser: Module<moduleUserState, RootState> = {
    namespaced: true,
    state:{
        email: '',
        nickname: '',
        loginState: false,
    },
    mutations:{
        setNickname(state: moduleUserState, user){
            state.nickname = user.nickname;
            state.loginState = user.login;
            state.email = user.email
        },
        setEmail(state, email){
            state.email = email;
        },
        logout(state){
            state.email = '';
            state.nickname = '';
            state.loginState = false;
        }
    },
    actions:{
        async loginUser({commit}: ActionContext<moduleUserState, RootState>, data: { nickname: string, login: Boolean }){
            commit('setNickname', data);
        },
        setEmail({commit}, email: string){
            commit('setEmail', email);
        },
        logout({commit}){
            commit('logout');
        }
    },
    getters:{
        loginState: (state) => state.loginState,
        nickname: (state) => state.nickname,
        email: (state) => state.email
    }
};
//const wordModule = () => new Vuex.Store(moduleWord);
export default moduleUser; 