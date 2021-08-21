<template>
    <div class="box">
        <button class="inbox" id="top" @click="modal">{{top.top}}</button>
        <button class="inbox" id="bottom">{{top.bottom}}</button>
    </div>
</template>
<style>
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
    import { Component, Prop, Vue, Emit } from 'vue-property-decorator';

    interface card {
        top: string;
        bottom: string;
    }

    @Component
    export default class Input2Box extends Vue {
        @Prop() top?: card[];
        dialog: Boolean = false;

        @Emit()
        chan(){
            console.log("자식"+this.top)
            return this.top;
        }

        modal(){
            alert("hi");
        }
    }
</script>
