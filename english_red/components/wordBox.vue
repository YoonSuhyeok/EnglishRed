<template>
    <div class="box">
        <button 
            class="inbox" id="top" @mousedown.middle="invisibleBottom(index)"
            @click="editBottomDiaglog">
            {{wordBox.top}}
        </button>

        <button :style="{visibility: bottomeIsShow ? 'visible' : 'hidden' }"
        class="inbox" id="bottom" @click="editTopDiaglog">
            {{wordBox.bottom}}
        </button>

        <v-dialog v-model="dialogTop" 
            transition="dialog-bottom-transition" width="1000px">
            <v-text-field
                v-model="wordBox.bottom" label="수정할 값을 입력하세오"
                autofocus solo width="500px" @keypress.enter="closeTop(index, wordBox.bottom)">
            </v-text-field>
        </v-dialog>

        <v-dialog v-model="dialogBottom" 
            transition="dialog-bottom-transition" width="1000px">
            <v-card height="150px">
                <v-text-field
                    v-model="wordBox.bottom" label="한글 뜻을 적어주세요"
                    autofocus solo width="500px" @keyup.enter="closebottom">
                </v-text-field>
            </v-card>
        </v-dialog>

    </div>
</template>

<style>
#bottom {
    color: #FF5A5A;
    font-size: small;
}
.box {
    display: inline-block;
}
.inbox {
    display: block;
}
button {
    border-radius: 25px;
    margin-right: 5px;
    cursor: pointer; 
    outline: none; 
    box-shadow: 1px 4px 0 rgb(0,0,0,0.5); 
    }
button:active {
     box-shadow: 1px 1px 0 rgb(0,0,0,0.5); 
     position: relative; 
     top:2px; 
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator';
    import WordBoxElement from '../interface/wordbox.interface';
    
    @Component
    export default class WordBox extends Vue {
        @Prop() wordBox?: WordBoxElement;
        @Prop() bottomeIsShow = false;
        @Prop() index?: number;
        dialogTop: Boolean = false;
        dialogBottom: Boolean = false;

        @Watch('wordBox')
        update(newValue:WordBoxElement, oldValue:WordBoxElement){
            //if(newValue.bottom=='_') this.bottomeIsShow = false;
        }

        @Emit()
        changeElement(){
            return this.wordBox;
        }
        
        @Emit('invisibleBottom')
        invisibleBottom(index: number){
        }

        visibleToInvisibleBottome(){
        }

        editTopDiaglog(){
            this.dialogTop = true;
        }

        editBottomDiaglog(){
            this.dialogBottom = true;
        }

        closeTop(){
            this.dialogTop = false;
        }

        @Emit('closebottom')
        closebottom(index: number, bottom: string){
            console.log(index, bottom);
            this.dialogBottom = false;
        }
    }
</script>
