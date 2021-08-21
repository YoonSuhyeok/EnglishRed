<template>
    <div>
        <div class="boxs">
            <div v-for="item in words" :key="item.id" >
                <word-box @changeElement="submit" :top="item"></word-box>
            </div>
        </div>
        
        <v-text-field
            label="입력해주세요" solo
            @keyup.enter="submit" v-model="message"
        ></v-text-field>
        <v-btn @click="change">Only English</v-btn>
        <v-btn @click="serverPush">저장</v-btn>
        {{ this.$store.state.wordModule}}
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
    import WordBoxElement from '@/interface/wordbox.interface';
    import WordBox from '~/components/wordBox.vue';

    @Component({ components: {WordBox} })
    export default class Index extends Vue {
        message: string = '';
        replaceWords: WordBoxElement[] = [];
        @Ref('inputs') boxs!: WordBox;

        created(){
            for(let i=0; i<this.words.length; ++i){
                this.replaceWords.push({bottom: '_', top: this.words[i].top })
            }
        }

        get words(){
            return this.$store.getters['moduleWord/wordBoxs'];
        }
        
        @Watch('words', {immediate: true, deep: true})
        update(newValue:WordBoxElement[], oldValue:WordBoxElement[]){
            this.replaceWords = [];
            for(let i=0; i<this.words.length; ++i){
                this.replaceWords.push({bottom: '_', top: this.words[i].top })
            }
        }
        
        submit(){
            if(this.$store.getters['moduleUser/loginState']){
                const top: string[]|undefined = this.message?.split(' ');
                if(top!==undefined){
                    const bottom: string[] = [];
                    top.forEach(i=>{
                        bottom.push('_');
                    })
                    this.$store.dispatch('moduleWord/enter', {top, bottom});
                    console.log('not null');
                }
                this.message = '';
            }
        }

        async change(){
            if(this.$store.getters['moduleUser/loginState']){
                const temp = this.words;
                this.$store.dispatch('moduleWord/replace', this.replaceWords);
                this.replaceWords = temp;
            }
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