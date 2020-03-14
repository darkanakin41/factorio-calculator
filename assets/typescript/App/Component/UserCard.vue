<template>
    <v-card class="v-card-profile" tile v-if="authModule.authenticated">

        <div class="app-loading" v-if="loading">
            <v-progress-circular color="primary" size="50" indeterminate />
        </div>
        <template v-else>
            <div class="image">
                <img src="../../../assets/leftmenu-header-background.jpg" alt="Banner profil image">
            </div>
            <div class="user">
                <v-avatar :size="90" color="primary">
                <span class="white--text headline">
                    {{ user.username.substr(0,1).toUpperCase() }}
                </span>
                </v-avatar>
                <div class="id">
                    <span class="pseudo">{{ user.username }}</span>
                    <span class="mail">{{ user.email }}</span>
                    <router-link :to="{name:'security-sign-out'}" class="logout">
                        Déconnexion
                    </router-link>
                </div>
            </div>
        </template>
    </v-card>
</template>

<script lang="ts">
    import {Component, Inject, Vue} from "vue-property-decorator";
    import AuthModule from "../../_Common/Store/AuthModule";
    import {authModule} from "../../_Common/Store";
    import UserResource from "../../_Common/Resource/UserResource";
    import User from "../../_Common/Model/User";

    @Component({
        components: {}
    })
    export default class UserCard extends Vue {
        @Inject('userResource')
        userResource: UserResource

        user: User | null = null
        loading: boolean = false
        authModule: AuthModule = authModule;

        async created() {
            this.loading = true
            if (!this.authModule.user || !this.authModule.user.username) {
                return
            }
            let users = await this.userResource.get({
                searches: [{field: 'username', query: this.authModule.user.username}]
            })
            if (users.length > 0) {
                this.user = users[0]
            }
            this.loading = false
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../libs/theming/mixins";
    @import "../../../scss/common/config";

    .v-card-profile {
        border-radius: 0;

        .image {
            height: 90px;
            overflow: hidden;

            img {
                width: 100%;
            }
        }

        .user {
            position: relative;
            z-index: 0;
            margin-top: -54px;
            padding: 8px 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-content: center;

            .v-avatar {
                margin: 0 auto;
                width: 90px;
                height: 90px;
                border-radius: 50%;
                overflow: hidden;
                @include box-shadow(0 1px 4px rgba(0, 0, 0, .25));

                img {
                    width: 100%;
                }
            }

            .id {
                margin-top: 10px;
                text-align: center;

                & > * {
                    display: block;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    position: relative;
                }

                .pseudo {
                    font-size: 1em;
                    font-weight: bold;
                }

                .mail,
                .logout {
                    font-size: .80em;
                    @include opacity(.4);
                }

                .logout {
                    @include transition(all .25s $cubicFastInSlowOut);

                    a {
                        color: inherit;
                    }

                    &:hover {
                        @include opacity(1);
                        @include transition(all .15s $cubicFastInSlowOut);
                    }
                }
            }
        }
    }
</style>
