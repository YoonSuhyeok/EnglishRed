import { RootState } from './index';
import { Module, ActionContext } from 'vuex';

export interface moduleUserState {
    email: string;
    nickname: string;
    loginState: Boolean;
    acessToken: string;
}

const moduleUser: Module<moduleUserState, RootState> = {
    namespaced: true,
    state:{
        email: '',
        nickname: '',
        acessToken: '',
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
        },
        setAccessToken(state, token){
            state.acessToken = token;
        }

    },
    actions:{
        async loginUser({commit}: ActionContext<moduleUserState, RootState>, data: { nickname: string, login: Boolean }){
            commit('setNickname', data);
        },
        setEmail({commit}, email: string){
            commit('setEmail', email);
        },
        setAccessToken({commit}, token: string){
            commit('setAccessToken', token);
        },
        logout({commit}){
            commit('logout');
        }
    },
    getters:{
        loginState: (state) => state.loginState,
        nickname: (state) => state.nickname,
        email: (state) => state.email,
        accessToken: (state) => state.acessToken,
    }
};
//const wordModule = () => new Vuex.Store(moduleWord);
export default moduleUser; 