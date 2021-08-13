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
        },
        setCurrentPageNumber(state, index: number){
            state.currentPage = index;
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
            array.forEach( i=> {
                commit('pushPage', i.name);
            })
        },
        async loadPage({commit}, currentPageNumber: number){
            commit('setCurrentPageNumber', currentPageNumber);
        }
    },
    getters:{
        page: (state) => state.page,
        currentPage: (state) => state.currentPage
    }
}
//const wordModule = () => new Vuex.Store(moduleWord);
export default modulePage; 