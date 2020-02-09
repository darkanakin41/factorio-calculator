<template>
    <v-dialog v-model="open" :persistent="true" :scrollable="true">
        <v-card>
            <v-toolbar dark class="headline primary darken-2">
                {{ title }}
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn text @click="setCreate(false)" :class="{active:!create}">
                        Recherche
                    </v-btn>
                    <v-btn text @click="setCreate(true)" :class="{active:create}">
                        Créer
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>

            <v-card-text v-if="!create">
                <v-text-field v-model="search" label="Recherche" />
                <Loading :position="'relative'" :displayed="mediaStore.isLoading" />
                <template v-if="!mediaStore.isLoading">
                    <v-item-group>
                        <v-layout wrap>
                            <template v-for="item in mediaStore.items">
                                <v-flex v-bind:class="['xs6','md3','lg2']">
                                    <v-item class="d-flex align-center">
                                        <a v-on:click="onClick(item)">
                                            <Card :item="item" />
                                        </a>
                                    </v-item>
                                </v-flex>
                            </template>
                        </v-layout>
                    </v-item-group>
                    <div class="text-xs-center">
                        <v-pagination
                            v-model="pagination.page"
                            :length="Math.ceil(mediaStore.total/pagination.rowsPerPage)"
                        />
                    </div>
                </template>
            </v-card-text>
            <template v-else-if="create">
                <MediaForm v-if="mediaCreated === undefined" :modal="true" :category="category" v-model="mediaCreated" />
                <template v-else>

                    <v-card-text>
                        <div class="text-center">
                            <p>L'image a bien été créée : </p>
                            <Card :item="mediaCreated" />
                        </div>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn v-on:click="setCreate(false)">
                            Retour à la recherche
                        </v-btn>
                        <v-btn v-on:click="onClick(mediaCreated)" color="primary">
                            Sélectionner cette image
                        </v-btn>
                        <v-btn v-on:click="setCreate(true)">
                            Créer une autre image
                        </v-btn>
                    </v-card-actions>
                </template>
            </template>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="open = false">
                    Annuler
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from "vue-property-decorator";
    import debounce from 'lodash/debounce';
    import axios, {CancelTokenSource} from 'axios';
    import Loading from "../Loading.vue";
    import Card from "../../Component/File/Card.vue";
    import MediaForm from "./MediaForm";
    import Media from "../../../_Common/Type/Media";
    import {mediaStore} from "../../../_Common/Store";

    const namespace: string = 'media';

    @Component({
        components: {MediaForm, Card, Loading}
    })
    export default class FileModal extends Vue {
        @Prop() title: string;
        @Prop() category?: string;
        @Prop({
            default: () => {
            }
        }) onClick: Function;

        open;
        pagination;
        search;
        axiosToken?: CancelTokenSource;
        create: false;
        mediaCreated?: Media;

        getPaginatedDebounced;

        data() {
            return {
                items: [],
                search: '',
                pagination: {
                    page: 1,
                    rowsPerPage: 12,
                    totalItems: 0
                },
                open: false,
                create: false,
                mediaCreated: undefined,
                mediaStore: mediaStore,
            }
        }

        created() {
            this.getPaginatedDebounced = debounce(mediaStore.getPaginated, 250);
        }

        private buildApiParameters() {
            let parameters = {};
            if (this.category !== undefined) {
                parameters.category = this.category;
            }
            if (this.search !== undefined) {
                parameters.search = this.search;
            }
            return parameters;
        }

        @Watch('open')
        onOpenUpdate() {
            if (this.open === false) {
                return;
            }
            this.create = false;
            if (this.pagination.page > 1) {
                this.pagination.page = 1;
            }
            if (this.search.trim() !== "") {
                this.search = "";
            }
            if (mediaStore.items.length === 0) {
                this.onPaginationUpdate();
            }
        }

        @Watch('pagination', {deep: true})
        onPaginationUpdate() {
            if (this.axiosToken !== undefined) {
                this.axiosToken.cancel();
            }
            this.axiosToken = axios.CancelToken.source();
            this.getPaginatedDebounced({
                ...this.pagination, ...this.buildApiParameters()
            }, this.axiosToken);
        }

        @Watch('search')
        onSearchUpdate() {
            if (this.search.trim().length < 3 && this.search.trim() !== "") {
                return;
            }
            if (this.axiosToken !== undefined) {
                this.axiosToken.cancel();
            }
            this.axiosToken = axios.CancelToken.source();
            this.getPaginatedDebounced({
                ...this.pagination, ...this.buildApiParameters()
            }, this.axiosToken);
        }

        setCreate(boolean){
            this.create = boolean;
            this.mediaCreated = undefined;
            if(!this.create){
                this.onPaginationUpdate();
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
