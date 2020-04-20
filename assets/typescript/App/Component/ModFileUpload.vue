<template>
    <v-layout wrap>
        <v-flex xs12 md5 pa-2>
            <v-file-input show-size
                          v-model="itemsFile"
                          label="Objets" />
        </v-flex>
        <v-flex xs12 md5 pa-2>
            <v-file-input show-size
                          v-model="recipesFile"
                          label="Recettes" />
        </v-flex>
        <v-flex xs12 md2 pa-2>
            <v-btn color="primary" depressed @click="upload()" :loading="loading">Charger</v-btn>
        </v-flex>
    </v-layout>
</template>


<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator'
  import Mod from "../../_Common/Model/Mod";
  import {snackbarModule} from "../../_Common/Store";
  import ModResource from "../../_Common/Resource/ModResource";
  import RecipeTable from "./RecipeTable.vue";
  import ItemTable from "./ItemTable.vue";

  @Component({})
    export default class ApiAutocomplete extends Vue {
        @Prop()
        mod: Mod
        @Prop({required: true})
        modResource: ModResource
        @Prop({required: true})
        recipeTable: RecipeTable
        @Prop({required: true})
        itemTable: ItemTable

        loading: boolean = false

        itemsFile: File | null = null
        recipesFile: File | null = null


        async upload() {
            this.loading = true
            try {

                await this.modResource.uploadFile(this.mod.id, {
                    recipesFile: this.recipesFile,
                    itemsFile: this.itemsFile
                })

                snackbarModule.setSnackbarEntry({
                    color: 'success',
                    icon: 'mdi-check',
                    title: 'Le chargement du fichier à bien été effectué'
                })

                if (this.recipesFile) {
                    this.recipeTable.getData()
                    this.recipesFile = null
                }
                if (this.itemsFile) {
                    this.itemTable.getData()
                    this.itemsFile = null
                }
            } catch (error) {
                snackbarModule.setSnackbarEntry({
                    icon: 'mdi-alert-circle-outline',
                    message: error.response.data['hydra:description'],
                    color: 'error'
                })
            } finally {
                this.loading = false
            }
        }
    }
</script>
