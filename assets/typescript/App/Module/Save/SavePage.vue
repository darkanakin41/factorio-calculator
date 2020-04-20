<template>
    <v-container fluid>
        <v-card>
            <v-sheet>
                <v-toolbar dark>
                    <v-toolbar-title>
                        {{ isCreate() ? 'Création d\'une recette' : 'Modification de la recette ' + item.name }}
                    </v-toolbar-title>
                </v-toolbar>
            </v-sheet>
            <v-card-text v-if="loading">
                <v-row no-gutters justify="center">
                    <v-progress-circular color="primary" size="50" indeterminate/>
                </v-row>
            </v-card-text>
            <v-form v-else>
                <v-card-text>
                    <v-layout wrap>
                        <v-flex xs12 pa-2>
                            <v-text-field v-model="item.name"
                                          label="Nom"
                                          :rules="required"
                                          required/>
                        </v-flex>

                        <v-flex xs6 md6 pa-2>
                            <api-autocomplete :resource="modResource"
                                              label="Mod"
                                              item-text="name"
                                              :item.sync="item.mod"
                            />
                        </v-flex>
                        <v-flex xs12 md6 pa-2>
                            <v-text-field v-model.number="item.craftingTime"
                                          type="number"
                                          label="Temps de craft"
                                          :rules="required"
                                          required/>
                        </v-flex>
                    </v-layout>
                </v-card-text>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn color="error" text @click="loadData()">Annuler</v-btn>
                    <v-btn color="primary" depressed type="submit" @click="save()">Sauvegarder</v-btn>
                </v-card-actions>
                <v-divider/>
                <v-card-text v-if="!isCreate()">
                    <v-tabs slider-color="primary">
                        <v-tab ripple>
                            Composants
                        </v-tab>
                        <v-tab ripple>
                            Produits
                        </v-tab>
                        <v-tab-item>
                            <recipe-component-field :recipe.sync="item"/>
                        </v-tab-item>
                        <v-tab-item>
                            <recipe-output-field :recipe.sync="item"/>
                        </v-tab-item>
                    </v-tabs>
                </v-card-text>
            </v-form>
        </v-card>
    </v-container>
</template>

<script lang="ts">
    import {Component, Inject, Prop, Vue} from 'vue-property-decorator'
    import {snackbarModule} from '../../../_Common/Store'
    import {SnackbarEntry} from '../../../_Darkanakin41/Store/SnackbarModule'
    import RULES from '../../_config/rules'
    import ApiAutocomplete from '../../Component/ApiAutocomplete.vue'
    import ModResource from '../../../_Common/Resource/ModResource'
    import RecipeResource from '../../../_Common/Resource/RecipeResource'
    import Recipe, {newRecipe} from '../../../_Common/Model/Recipe'
    import RecipeComponentField from '../../Component/RecipeComponentField.vue'
    import RecipeOutputField from '../../Component/RecipeOutputField.vue'

    @Component({
        components: {RecipeOutputField, RecipeComponentField, ApiAutocomplete}
    })
    export default class SavePage extends Vue {
        @Inject('modResource')
        modResource: ModResource

        @Inject('recipeResource')
        recipeResource: RecipeResource

        @Prop({default: null})
        id?: string

        loading: Boolean = false

        item: Recipe | null = null

        required: {}[] = [
            RULES.required
        ]

        async created() {
            await this.loadData()
        }

        async loadData() {
            this.loading = true
            try {
                if (!this.id) {
                    this.item = newRecipe()
                } else {
                    this.item = await this.recipeResource.getOne(this.id)
                }
            } finally {
            }
            this.loading = false
        }

        isCreate() {
            return this.item === null || this.item.id === null
        }

        async save() {
            this.loading = true
            try {
                let snackback: SnackbarEntry = {
                    color: 'success',
                    icon: 'mdi-check'
                }

                if (this.item && !this.item.mod) {
                    this.item.mod = null
                }
                if (this.item && this.item.id) {
                    this.item = await this.recipeResource.patch(this.item.id, this.item)
                    snackback.title = 'La modification de la recette à bien été effectuée'
                } else if (this.item) {
                    this.item = await this.recipeResource.post(this.item)
                    snackback.title = 'L\'ajout de la recette à bien été effectué'
                    await this.$router.push({name: 'item-edit', params: {id: this.item.id}})
                }
                snackbarModule.setSnackbarEntry(snackback)
            } catch (error) {
                snackbarModule.setSnackbarEntry({
                    icon: 'mdi-alert-circle-outline',
                    message: error.response.data['hydra:description'],
                    color: 'error'
                })
            }
            this.loading = false
        }

    }
</script>

<style lang="scss" scoped>
</style>
