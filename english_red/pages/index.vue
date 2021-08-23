<template>
    <div>
        <div class="boxs">
            <div v-for="(item, i) in words" :key="item.id" >
                <word-box @changeElement="submit" :index=i @invisibleBottom="changeWordBoxVisble"
                @closebottom="changeBottom"
                :wordBox="item" :bottomeIsShow=isShowBottoms[i]></word-box>
            </div>
        </div>
        
        <v-text-field
            label="입력해주세요" solo
            @keyup.enter="submit" v-model="message"
        ></v-text-field>
        <v-btn @click="change">Only English</v-btn>
        <v-btn @click="serverPush">저장</v-btn>
    </div>
</template>
<style>
 .boxs {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    justify-content: flex-start;
 }
 input-2-box {
   display: block;
 }
 v-text-field {
    display: inline;
 }
</style>
<script lang="ts">
    import { Component, Vue, Watch, Ref } from 'vue-property-decorator';
    import WordBoxElement from '../interface/wordbox.interface';
    import WordBox from '../components/wordBox.vue';

    @Component({ components: {WordBox} })
    export default class Index extends Vue {
        message: string = '';
        @Ref('inputs') boxs!: WordBox;
        bottomIsShows: Boolean[] = [];

        created(){
            const page = this.$store.getters['modulePage/page'];
            const currentPage = this.$store.getters['modulePage/currentPage'];
            this.$store.dispatch('moduleWord/loadWord',{
                pageName: page[currentPage],
                userId: this.$store.getters['moduleUser/email'],
                accessToken: this.$store.getters['moduleUser/accessToken'],
            });
            for(let i=0; i<this.words.length; ++i){
                this.bottomIsShows.push(true);
            }
        }

        get words(){
            return this.$store.getters['moduleWord/wordBoxs'];
        }
        
        get isShowBottoms(){
            return this.bottomIsShows;
        }
        
        changeWordBoxVisble(index: number){
            console.log(index);
            this.bottomIsShows[index] = !this.bottomIsShows[index];
            let empty = [];
            for(let i=0; i<this.bottomIsShows.length; ++i){
                empty.push(this.bottomIsShows[i]);
            }
            this.bottomIsShows = empty;
            console.log(this.bottomIsShows)
        }

        changeBottom(index:number, bottom: string){
            console.log(index, bottom);
        }

        submit(){
            if(this.$store.getters['moduleUser/loginState']){
                const top: string[]|undefined = this.message?.split(' ');
                if(top!==undefined){
                    const bottom: string[] = [];
                    top.forEach(i=>{
                        bottom.push('');
                    })
                    this.$store.dispatch('moduleWord/enter', {top, bottom});
                    console.log('not null');
                }
                this.message = '';
            }
        }

        change(){
            let empty = [];
            for(let i=0; i<this.bottomIsShows.length; ++i){
                empty.push(!this.bottomIsShows[i]);
            }
            this.bottomIsShows = empty;
            console.log(this.bottomIsShows)
        }
        
        serverPush(){
            if(this.$store.getters['moduleUser/loginState']){
                const page = this.$store.getters['modulePage/page'];
                const currentPageNumber = this.$store.getters['modulePage/currentPage']
                const email = this.$store.getters['moduleUser/email']
                this.$store.dispatch('moduleWord/saveWordBoxs', {
                    wordBox: this.words,
                    pageName: page[currentPageNumber],
                    userId: email,
                });
            }
        }
    }
</script>