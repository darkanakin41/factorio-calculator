<template>
    <div>
        <v-list>
            <template v-for="item in menuItems">
                <template v-if="item.children === undefined && isAuthorized(item)">
                    <!--                S'il y a des liens -->
                    <template v-if="item.url !== undefined">
                        <v-list-item v-on:click="window.location = item.url">
                            <v-list-item-action>
                                <v-icon v-if="item.icon !== undefined">{{ item.icon }}</v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>{{item.label}}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </template>
                    <template v-else-if="item.name !== undefined" >
                        <v-list-item :to="{name: item.name}" :exact="item.exact === true">
                            <v-list-item-action>
                                <v-icon v-if="item.icon !== undefined">{{ item.icon }}</v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>{{item.label}}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </template>
                    <template v-else>
                        <v-list-item>
                            <v-list-item-action>
                                <v-icon v-if="item.icon !== undefined">{{ item.icon }}</v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>{{item.label}}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </template>
                </template>
                <template v-else-if="isAuthorized(item)">
                    <v-list-group>
                        <template v-slot:activator>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>{{item.label}}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </template>

                        <template v-for="child in item.children">
                            <template v-if="isAuthorized(child)">
                                <template v-if="child.name === undefined && isAuthorized(child)">
                                    <v-list-item>
                                        <v-list-item-action>
                                            <v-icon v-if="child.icon !== undefined">{{ child.icon }}</v-icon>
                                        </v-list-item-action>
                                        <v-list-item-content>
                                            <v-list-item-title>{{child.label}}</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </template>
                                <template v-else>
                                    <v-list-item :to="{name: child.name}" :exact="child.exact === true">
                                        <v-list-item-action>
                                            <v-icon v-if="child.icon !== undefined">{{ child.icon }}</v-icon>
                                        </v-list-item-action>
                                        <v-list-item-content>
                                            <v-list-item-title>{{child.label}}</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </template>
                            </template>
                        </template>
                    </v-list-group>
                </template>
            </template>
        </v-list>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import routes from "../_config/leftmenu";

    const namespace: string = 'security';

    @Component({
        // components: {Card}
    })
    export default class LeftMenu extends Vue {
        // authStore: AuthStore;

        menuItems;

        data() {
            return {
                menuItems: routes,
                // authStore: authStore
            }
        }

        isAuthorized(item:any){
        //     if(authStore.payload === null){
        //         return false;
        //     }
        //
        //     let authorized = false;
        //     if(item.roles === undefined){
        //         return true;
        //     }
        //     item.roles.forEach((i) => {
        //         if(authStore.payload.roles.indexOf(i) !== -1){
        //             authorized = true;
        //         }
        //     });
        //     return authorized;
            return true;
        }
    }
</script>

<style lang="scss" scoped>
    .drawer-header {
        position: relative;
        z-index: 1;
    }

    .v-list {
        color: white;

        .v-icon {
            &.fa, &.fas, &.fab, &.far {
                font-size: 18px;
            }
        }
    }
</style>
