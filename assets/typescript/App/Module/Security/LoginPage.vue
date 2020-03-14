<template>
    <v-container fill-height fluid>
        <v-layout row wrap>
            <v-row align="center"
                   justify="center">
                <v-flex xs12 sm8 md4 v-if="loading">
                    <div class="app-loading">
                        <v-progress-circular color="primary" size="200" indeterminate />
                    </div>
                </v-flex>
                <v-flex xs12 sm8 md4 v-else>
                    <v-card class="elevation-12" v-if="!isAuthenticated">
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Connexion</v-toolbar-title>
                        </v-toolbar>
                        <v-form ref="loginForm"
                                v-model="loginFormValid"
                                v-on:submit.prevent="onSubmitMethod()">
                            <v-card-text>
                                <v-text-field prepend-icon="person"
                                              name="login"
                                              label="Identifiant"
                                              type="text"
                                              :rules="required"
                                              v-model="username" />
                                <v-text-field id="password"
                                              prepend-icon="lock"
                                              name="password"
                                              label="Mot de passe"
                                              type="password"
                                              :rules="required"
                                              v-model="password" />
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn :disabled="!loginFormValid" color="primary" type="submit">
                                    Connexion
                                </v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card>
                    <div class="callout success pa-2" v-else>
                        Vous avez été authentifié, vous allez être redirigé vers la page d'accueils dans quelques instants ...
                        <br />
                        Si ce n'est pas le cas,
                        <router-link :to="{name: 'item-index'}">cliquez-ici</router-link>
                    </div>
                </v-flex>
            </v-row>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import RULES from "../../_config/rules";
    import {authModule, snackbarModule} from "../../../_Common/Store";

    const namespace: string = 'security';

    @Component({
        components: {}
    })
    export default class LoginPage extends Vue {
        loading: boolean = false
        loginFormValid = true
        username: string = ''
        password: string = ''

        required: {}[] = [
            RULES.required
        ]

        mounted() {
            if (this.isAuthenticated) {
                this.onSuccess()
            }
        }

        async onSubmitMethod() {
            if (this.loginFormValid) {
                this.loading = true
                try {
                    await authModule.tryGetUser({username: this.username, password: this.password})
                    this.onSuccess()
                } catch (error) {
                    if (error.response.status === 401) {
                        snackbarModule.setSnackbarEntry({
                            icon: 'mdi-alert-circle',
                            message: 'Couple identifiant/mot de passe non valide',
                            color: 'red'
                        })
                    }
                }
                this.loading = false
            }
        }

        onSuccess() {
            console.log("ON SUCCESS")
            setTimeout(() => {
                this.$router.push({name: 'item-index'})
            }, 5000)
        }

        get isAuthenticated() {
            return authModule.authenticated
        }
    }
</script>

<style lang="scss" scoped>
    .app-loading{
        text-align : center;
    }
</style>
