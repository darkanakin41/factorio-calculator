<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12" v-if="!isAuthenticated">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Connexion</v-toolbar-title>
                    </v-toolbar>
                    <v-form v-on:submit.prevent="onSubmitMethod()">
                        <v-card-text>
                            <v-text-field prepend-icon="person"
                                          name="login"
                                          label="Identifiant"
                                          type="text"
                                          v-model="username" />
                            <v-text-field prepend-icon="mail"
                                          name="email"
                                          label="Adresse e-mail"
                                          type="text"
                                          v-model="email" />
                            <v-text-field prepend-icon="lock"
                                          name="password"
                                          label="Mot de passe"
                                          type="password"
                                          v-model="password" />
                            <v-text-field prepend-icon="lock"
                                          name="passwordConfirmed"
                                          label="Confirmation de mot de passe"
                                          type="password"
                                          v-model="passwordConfirmed" />
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn :disabled="!isFormValid()" color="primary" type="submit">Inscription</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
                <div class="callout success" v-else>
                    Votre compte a bien été créé et vous avez automatiquement été authentifié. Vous allez à présent être redirigé vers la page d'accueil.
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

    @Component({
        components: {}
    })
    export default class RegistrationPage extends Vue {
        username: string = ''
        password: string = ''
        passwordConfirmed: string = ''
        email: string = ''

        isFormValid() {
            return false
        }

        onSubmitMethod() {

        }

        get isAuthenticated() {
            return false
        }

    }
</script>

<style lang="scss" scoped>
</style>
