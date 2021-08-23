import { RootState } from './index';
import { ActionContext, Module } from 'vuex';
import AxiosService from '@/services/server.service';

interface modulePageState {
    page: string[];
    currentPage: number;
}

const modulePage: Module<modulePageState, RootState> = {
    namespaced: true,
    state:{
        page: [],
        currentPage: 0
    },
    mutations:{
        pushPage(state: modulePageState, page: string){
            state.page.push(page);
            console.log(state.page)
        },
        setCurrentPageNumber(state, index: number){
            state.currentPage = index;
        },
        logout(state){
            state.page = [];
            state.currentPage = 0;
        },
        setTitle(state, title){
            const pages = state.page;
            pages[state.currentPage] = title;
            state.page = pages;
        }
    },
    actions:{
        async findPage({state, commit}: ActionContext<modulePageState, RootState>, userId: string){
            const page = await AxiosService.instance.get(`/page?userId=${userId}`);
            const pages: {id: number, name: string}[] = page.data;
            pages.forEach(i => {
                commit('pushPage', i.name);
            });
        },
        async firstInit({commit}, data:{ name: string, userId: string}){
            await AxiosService.instance.post('/page', { name: data.name, userId: data.userId});
            await AxiosService.instance.post('/page', { name: data.name+2, userId: data.userId});
            await AxiosService.instance.post('/page', { name: data.name+3, userId: data.userId});
            const page = await AxiosService.instance.get(`/page?userId=${data.userId}`);
            const array: {name: string}[] = page.data;
            commit('logout');
            array.forEach( i=> {
                commit('pushPage', i.name);
            })
        },
        async loadPage({commit}, currentPageNumber: number){
            commit('setCurrentPageNumber', currentPageNumber);
        },
        logout({commit}){
            commit('logout');
        },
        async setTitle({state, commit}, data: {userId: string, title: string}){
            AxiosService.instance.patch(`/page?userId=${data.userId}`, { 
                name: state.page[state.currentPage], newName: data.title});
            commit('setTitle', data.title);
        },
        AddPage({commit}, data: {userId: string, name: string}){
            AxiosService.instance.post('/page', { name: data.name, userId: data.userId});
            console.log(data);
            commit('pushPage', data.name);
        }
    },
    getters:{
        page: (state) => state.page,
        currentPage: (state) => state.currentPage
    }
}
//const wordModule = () => new Vuex.Store(moduleWord);
export default modulePage; 