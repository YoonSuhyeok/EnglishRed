<template>
    <div>
        <div class="boxs" v-for="item in words" :key="item.id" >
            <word-box @changeElement="submit" :top="item"></word-box>
        </div>
        
        <v-text-field
            label="입력해주세요" solo
            @keyup.enter="submit" v-model="message"
        ></v-text-field>
        <v-btn @click="change">Click</v-btn>
    </div>
</template>
<style>
 .boxs {
    display: inline;
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
        words: WordBoxElement[] = [];
        replaceWords: WordBoxElement[] = [];
        @Ref('inputs') boxs!: WordBox;

        @Watch('words', {immediate: true, deep: true})
        update(newValue:WordBoxElement[], oldValue:WordBoxElement[]){}
        
        submit(){
            const temp: string[]|undefined = this.message?.split(' ');
            if(this.message!=='' && temp){
                temp.forEach(
                    i => {
                        this.words.push( {
                            top: i,
                            bottom: "_".repeat(i.length)
                        })
                        this.replaceWords.push( {
                            top: i,
                            bottom: "".repeat(i.length)
                        })
                    }
                );
            }
            for(let i=0; i<this.words.length; ++i){
                if(this.words[i].top===''){
                    console.log(this.words[i]);
                    this.words.splice(i, 1);
                    this.replaceWords.splice(i, 1);
                }
            }
            this.message = '';
        }

        change(){
            const temp = this.words;
            this.words = this.replaceWords;
            this.replaceWords = temp;
        }
    }
</script>