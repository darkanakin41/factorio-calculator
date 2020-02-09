<template>
    <div>
        <Loading :displayed="mediaStore.isLoading" :position="'relative'"></Loading>
        <v-form v-if="!mediaStore.isLoading" @submit="submitForm()">
            <v-card-title v-if="!modal">
                <template v-if="selected.id === undefined">Création</template>
                <template v-else>{{selected.filename}}</template>
            </v-card-title>
            <v-card-text>
                <ErrorManager ref="errorManager" />
                <v-text-field v-model="selected.filename" label="Nom du fichier" required />
                <v-text-field v-model="selected.copyright" label="Copyright" />
                <v-autocomplete label="Catégorie"
                                v-model="selected.category"
                                :items="categories"
                                :disabled="category !== '' && category !== undefined"
                                item-text="label"
                                item-value="value"
                                required />
                <v-file-input v-model="selected.rawFile" label="Fichier" required accept="image/*" v-if="selected.id === undefined" />
            </v-card-text>
            <v-card-actions>
                <v-btn @click="resetForm()" color="error">
                    {{ selected.id ? "Annuler" : "Remettre à zéro" }}
                </v-btn>
                <v-btn @click="submitForm()">
                    {{ selected.id ? "Modifier" : "Créer" }}
                </v-btn>
                <v-btn @click="deleteDialog = true" v-if="selected.id !== undefined" color="primary">
                    Supprimer
                </v-btn>
            </v-card-actions>
        </v-form>
        <DeleteDialog v-model="deleteDialog" :title="selected.filename" :open="deleteDialog" :callback="deleteSelected" />
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from "vue-property-decorator";
    import axios, {CancelTokenSource} from 'axios';
    import Loading from "../Loading.vue";
    import Media from "../../../_Common/Type/Media";
    import ErrorManager from "../Form/ErrorManager";
    import DeleteDialog from "../Form/DeleteDialog";
    import {MEDIA_CATEGORIES} from "../../../_Common/Nomenclature/mediaCategories";
    import {mediaStore} from "../../../_Common/Store";

    const namespace: string = 'media';

    @Component({
        components: {DeleteDialog, ErrorManager, Loading}
    })
    export default class MediaForm extends Vue {
        @Prop() item: Media;
        @Prop() category?: string;
        @Prop({default: false}) modal: boolean;
        @Prop({
            default: () => {
            }
        }) afterSave: Function;

        axiosToken?: CancelTokenSource;

        selectedFile: File;
        selected?: Media;
        deleteDialog: boolean;

        data() {
            return {
                selected: this.getEmptyEntity(),
                deleteDialog: false,
                categories: MEDIA_CATEGORIES,
                mediaStore: mediaStore,
            }
        }

        async submitForm() {
            if (!this.validateForm()) {
                window.scrollTo(0, this.$refs.errorManager.offsetTop);
                return;
            }
            if (this.axiosToken !== undefined) {
                this.axiosToken.cancel();
            }
            this.axiosToken = axios.CancelToken.source();
            await mediaStore.save(this.selected, this.axiosToken);

            this.$emit('input', mediaStore.item);
            if (this.afterSave !== undefined) {
                this.afterSave();
            }

            this.selected = this.getEmptyEntity();
        }

        private validateForm() {
            this.$refs.errorManager.resetErrors();
            if (this.selected.filename.trim().length === 0) {
                this.$refs.errorManager.addError('filename', 'Le nom du fichier ne peut pas être vide');
            }
            if (this.selected.id === undefined) {
                if (this.selected.category.trim().length === 0) {
                    this.$refs.errorManager.addError('category', 'La catégorie ne peut pas être vide');
                }
                if (this.selected.rawFile === undefined) {
                    this.$refs.errorManager.addError('rawFile', 'Le fichier ne peut pas être vide');
                }
            }
            this.$refs.errorManager.$forceUpdate();
            return this.$refs.errorManager.isValid();
        }

        private getEmptyEntity(): Media {
            return <Media>{
                filename: '',
                copyright: '',
                category: this.category || '',
                rawFile: undefined,
            };
        }

        resetForm() {
            this.selected = this.getEmptyEntity();
            this.$emit('input', this.selected);
        }

        deleteSelected() {
            mediaStore.delete(this.selected)
                .catch(error => this.$errorMessage = error)
                .then(() => {
                    if (this.afterSave !== undefined) {
                        this.afterSave();
                    }
                });
        }

        @Watch('selectedFile')
        onSelectedFileUpdate() {
            this.selected.rawFile;
        }

        @Watch('item', {deep: true})
        onItemUpdate() {
            this.selected = this.item;
        }
    }
</script>

<style lang="scss" scoped>
</style>
