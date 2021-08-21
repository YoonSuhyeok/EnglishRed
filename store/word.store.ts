import { RootState } from './index';
import {  ActionContext, Module } from 'vuex';
import AxiosService from '@/services/server.service';
import WordBoxElement from '@/interface/wordbox.interface';

interface moduleWordState {
    wordBoxs: WordBoxElement[];
}

const moduleWord: Module<moduleWordState, RootState> = {
    namespaced: true,
    state:{
        wordBoxs: []
    },
    mutations:{
        setWordBox(state: moduleWordState, wordBox: WordBoxElement[]){
            state.wordBoxs = wordBox;
        },
        addWordBox(state: moduleWordState, wordBox: WordBoxElement[]){
            state.wordBoxs = state.wordBoxs.concat(wordBox);
            console.log(state.wordBoxs.concat(wordBox));
        },
        logout(state){
            state.wordBoxs = [];
        },
        replace(state, data: WordBoxElement[]){
            state.wordBoxs = data;
            console.log(state.wordBoxs);
        }
    },
    actions:{
        saveWordBoxs({state, commit}: ActionContext<moduleWordState, RootState>,
            data: { wordBox: WordBoxElement[], pageName: string, userId: string }){
            const tops: string[] = [];
            const bottoms: string[] = [];
            data.wordBox.forEach( i => {
                tops.push(i.top);
                bottoms.push(i.bottom);
            });
            const topsString = tops.join('`');
            const bottomsString = bottoms.join('`');
            AxiosService.instance.post('/word', {
                pageName: data.pageName,
                wordBox: {top: topsString, bottom: bottomsString},
                userId: data.userId,
            })
            commit('setWordBox', data.wordBox);
        },
        async loadWord({state, commit}, data: {pageName: string, userId: string}){
            const word = await AxiosService.instance.get(`/word/w?pageName=${data.pageName}&userId=${data.userId}`);
            const words = word.data;

            if(words.length ==0){
                commit('setWordBox', []);
            } else {
                const top: string[] = (word.data[0].top as string).split('`');
                const bottom: string[] = (word.data[0].bottom as string).split('`');
                const wordBox: WordBoxElement[] = [];
                for(let i=0; i<top.length; ++i){
                    wordBox.push({top: top[i], bottom: bottom[i]});
                }
                commit('setWordBox', []);
                commit('addWordBox', wordBox);
            }
        },
        enter({commit}, data: { top: string[], bottom: string[]}){
            const wordBox: WordBoxElement[] = [];
            for(let i=0; i<data.top.length; ++i){
                wordBox.push({top: data.top[i], bottom: data.bottom[i]});
            };
            commit('addWordBox', wordBox);
        },
        logout({commit}){
            commit('logout');
        },
        replace({commit}, data: WordBoxElement[]){
            commit('replace', data);
        }
    },
    getters:{
        wordBoxs: (state) => state.wordBoxs,
    }
}
//const wordModule = () => new Vuex.Store(moduleWord);
export default moduleWord; 