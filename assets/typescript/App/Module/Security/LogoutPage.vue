<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <div class="callout success pa-2">
                    Vous avez été déconecté, vous allez être redirigé vers la page d'accueils dans quelques instants ...
                    <br />
                    Si ce n'est pas le cas,
                    <router-link :to="{name: 'item-index'}">cliquez-ici</router-link>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {authModule} from "../../../_Common/Store";

    @Component({
        components: {}
    })
    export default class LogoutPage extends Vue {

        mounted(){
            console.log("mounted")
            if(this.isAuthenticated){
                console.log("déconnexion")
                authModule.logout()
                setTimeout(() => {
                    this.$router.push({name:'item-index'})
                }, 5000)
            }
        }
        get isAuthenticated(){
            return authModule.authenticated
        }
    }
</script>

<style lang="scss" scoped>
</style>
