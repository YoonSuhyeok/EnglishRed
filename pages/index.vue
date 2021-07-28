<template>
    <div>
        {{ message }}
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component({})
    export default class Index extends Vue {
        message: string = '안녕하세요';
    }
</script>
