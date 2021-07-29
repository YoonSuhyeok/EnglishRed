<template>
    <div>
        <div class="boxs" v-for="item in topArray" :key="item.id">
            <input-2-box @chan="submit" :top="item"></input-2-box>
        </div>
        
        <v-text-field
            label="입력해주세요"
            solo
            @keyup.enter="submit"
            v-model="message"
        ></v-text-field>
    </div>
</template>
<style >
 .boxs {
     display: inline;
 }
 input-2-box {
   display: block;  
 }
</style>
</style>
<script lang="ts">
    import { Component, Vue, Watch } from 'vue-property-decorator';
    import Input2Box from '@/components/input2Box.vue';

    interface card {
        top: string;
        bottom: string;
    }

    @Component({
        components: {Input2Box}
    })
    export default class Index extends Vue {
        message: string = '';
        topArray: card[] = [];

        @Watch('topArray', {immediate: true, deep: true})
        update(newValue:card[], oldValue:card[]){
            console.log(newValue, oldValue);
        }
        
        submit(){
            const temp: string[]|undefined = this.message?.split(' ');
            if(temp){ 
                console.log(temp);
                temp.forEach(
                    i => {
                        
                        this.topArray.push( {
                            top: i,
                            bottom: "__".repeat(i.length)
                        })
                    }
                );
            }
            this.message = '';
        }
    }
</script>
