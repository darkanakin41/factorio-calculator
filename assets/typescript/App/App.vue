<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer">
      <LeftMenu/>
    </v-navigation-drawer>
    <v-app-bar app id="top-bar">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <!--                <img :src="logo" :alt="sitename" :title="sitename" class="logo" />-->
        {{ sitename }}
      </v-toolbar-title>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
      <Footer/>
    </v-content>
    <snackbar/>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Footer from '../_Darkanakin41/Layout/Footer.vue'
import Snackbar from '../_Darkanakin41/Component/Snackbar.vue'
import LeftMenu from './Layout/LeftMenu.vue'
// import Logo from '../../assets/logo/logo-large-blanc-327x50.png';

@Component({
  components: { Snackbar, Footer, LeftMenu }
})
export default class App extends Vue {
  sitename: string
  logo
  drawer: Boolean

  // authStore: AuthStore;

  data () {
    return {
      drawer: true,
      // logo: Logo,
      sitename: 'Factorio CalculatorData',
    }
  }

  created () {
    this.$vuetify.theme.dark = true
  }

  // async mounted() {
  //     if (authStore.payload === null) {
  //         await authStore.checkAuthentification();
  //         this.onRouteUpdate(this.$route, undefined);
  //     }
  // }

  // @Watch('$route')
  // async onRouteUpdate(to, from) {
  //     console.log(typeof to);
  //     if (to.meta.roles !== undefined) {
  //         if (authStore.payload === null) {
  //             await authStore.checkAuthentification();
  //         }
  //
  //         let granted = false;
  //         let user = this.authStore.payload;
  //
  //         if (user !== null) {
  //             to.meta.roles.forEach((role: string) => {
  //                 if (user.roles.indexOf(role) !== -1) {
  //                     granted = true;
  //                 }
  //             })
  //         }
  //         if (!granted) {
  //             this.$router.push(from || '/home');
  //             return;
  //         }
  //     }
  // }

}
</script>

<style lang="scss" scoped>
@import "../../libs/theming/mixins";
@import "../../scss/common/config";

@include importGoogleFont("Roboto|Material Icons");

.app-loading {
  text-align: center;

  .loading {
    font-size: 3rem;
    padding: 15px 0;
  }
}

footer {
  margin-top: 15px;

  a {
    color: inherit;
    @include opacity(.8);
    @include transition(all .35s linear);

    &:hover {
      @include opacity(1);
      @include transition(all .15s linear);
    }
  }
}

.v-footer {
  flex-direction: row;
  justify-content: space-between;
  align-self: center;

  margin: 0;
  padding: 0;
  font-size: 1rem;

  & > * {
    line-height: 1.5;
    padding: .5rem .7rem;
  }
}

.v-toolbar {
  &#top-bar {
    background: $mainColor;

    .logo {
      margin-top: 6px;
    }
  }
}

@media (max-width: $breakpointSmall) {
  .v-footer {
    flex-direction: column;
    height: auto !important;
  }
}
</style>
