<template>
    <view-container :hide-navigator="layout.noNav || loading">
        <template v-slot:title>
            Factorio CalculatorData
        </template>
        <template v-if="!loading">
            <router-view></router-view>
            <Footer />
            <snackbar />
        </template>
        <template v-else>
            <v-container fill-height fluid>
                <v-layout row wrap>
                    <v-row align="center"
                           justify="center">
                        <v-flex xs12 sm8 md4>
                            <div class="app-loading">
                                <v-progress-circular color="primary" size="200" indeterminate />
                            </div>
                        </v-flex>
                    </v-row>
                </v-layout>
            </v-container>
        </template>
    </view-container>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import Footer from '../_Darkanakin41/Layout/Footer.vue'
    import Snackbar from '../_Darkanakin41/Component/Snackbar.vue'
    import LeftMenu from './Layout/LeftMenu.vue'
    import ViewContainer from "./Layout/ViewContainer.vue";
    import {authModule} from "../_Common/Store";

    @Component({
        components: {ViewContainer, Snackbar, Footer, LeftMenu}
    })
    export default class App extends Vue {
        loading: boolean = false

        async created() {
            this.$vuetify.theme.dark = true
            this.loading = true
            await authModule.tryGetUser()
            this.loading = false
        }

        get layout() {
            return this.$route.meta && this.$route.meta.layout ? this.$route.meta.layout : {}
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
    }
</style>
