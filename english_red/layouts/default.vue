<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          exact
        >
          <!-- <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action> -->
          <v-list-item-content @click="listClick(item, i)">
            <v-list-item-title v-text="item"/>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn fab @click="pageAdd">
        <v-icon dark>
          mdi-plus
        </v-icon>
      </v-btn>
      <v-toolbar-title v-text="title[currentPage]" @click="dialogPageShow"/>
      <v-spacer />
      <v-btn v-if="!loginState" @click="dialogLoginShow">{{nickname}}로그인</v-btn>
      <v-btn v-else @click="logout">{{nickname}} 로그아웃</v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
      <v-dialog v-model="dialogPage" 
      transition="dialog-bottom-transition" width="1000px">
       <v-text-field
          v-model="dialogPageTitle" autofocus solo width="500px" 
          @keypress.enter="closeDialogPage">
        </v-text-field>
      </v-dialog>

      <v-dialog v-model="dialogAddPage" 
      transition="dialog-bottom-transition" width="1000px">
       <v-text-field
          v-model="dialogNewPageTitle" autofocus solo width="500px" 
          @keypress.enter="closeDialogNewPage">
        </v-text-field>
      </v-dialog>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
  import AxiosService from '../services/server.service';

  import { Component, Vue, Watch, Ref } from 'vue-property-decorator';
  @Component({ components: {} })
  export default class Default extends Vue {
    clipped: Boolean = false;
    drawer: Boolean = false;
    fixed: Boolean = false;
    miniVariant: Boolean = false;
    right: Boolean = true;
    rightDrawer: Boolean = false;
    
    dialogPage: Boolean = false;
    dialogAddPage = false;

    dialogPageTitle: string = '';
    dialogNewPageTitle: string = '';


    async created(){
      const code = window.location.search.substring(6);
      console.log(code);
      // if(code){
      //   const token = await AxiosService.instance.get('/token');
      // }
      if(code){
        const user = await AxiosService.instance.get('/profile',{
          headers: { 'Authorization': 'Bearer' + code }
        });

        this.$store.dispatch('moduleUser/loginUser', { nickname: user.data.nickname, login: true});
        this.$store.dispatch('moduleUser/setEmail', user.data.id);
        this.$store.dispatch('moduleUser/setAccessToken', code);
        await this.$store.dispatch('modulePage/findPage', user.data.id);
        const page: string[] = this.$store.getters['modulePage/page'];
         if(page.length == 0){
           await this.$store.dispatch('modulePage/firstInit', {
             name: '첫번째 글',
             userId: user.data.id
           });
         } else {
           await this.$store.dispatch('moduleWord/loadWord', {
             pageName: this.$store.getters['modulePage/page'][0], 
             userId: user.data.id
           });
         }
        window.location.href = 'http://localhost:3000';
      }
    }

    get loginState(){
      return this.$store.getters['moduleUser/loginState'];
    }

    get nickname(){
      return this.$store.getters['moduleUser/nickname'];
    }

    get title(){
      return this.$store.getters['modulePage/page'];
    }

    get items(){
      return this.$store.getters['modulePage/page'];
    }

    get currentPage(){
      return this.$store.getters['modulePage/currentPage'];
    }

    @Watch('title')
    onTitleChanged(val: string, old: string){

    }
    
    logout(){
      this.$store.dispatch('moduleUser/logout');
      this.$store.dispatch('modulePage/logout');
      this.$store.dispatch('moduleWord/logout');
      // 추가적으로 Page도 초기화해야한다.
    }

    listClick(pageName: string, index: number){
      this.$store.dispatch('modulePage/loadPage', index);
      this.$store.dispatch('moduleWord/loadWord', { 
        pageName: pageName,
        userId: this.$store.getters['moduleUser/email']
      });
    }

    dialogPageShow(){ this.dialogPage = true; }

    async dialogLoginShow(){
      window.location.href = 'http://localhost:50000/login'
    }

    closeDialogPage(){ 
      this.dialogPage = false;
      this.$store.dispatch('modulePage/setTitle', {
        userId: this.$store.getters['moduleUser/email'],
        title: this.dialogPageTitle
      });
    }
    
    pageAdd(){
      if(this.$store.getters['moduleUser/loginState']){
        this.dialogAddPage=true;
      }
    }

    closeDialogNewPage(){
      this.dialogAddPage=false;
      this.$store.dispatch('modulePage/AddPage', {
        name: this.dialogNewPageTitle,
        userId: this.$store.getters['moduleUser/email']
      });
    }
  }

</script>