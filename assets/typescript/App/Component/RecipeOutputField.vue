<template>
  <v-container fluid>
    <v-row no-gutters justify="center" v-if="recipeOutput === null || loading">
      <v-progress-circular color="primary" size="50" indeterminate/>
    </v-row>
    <template v-else>
      <v-layout wrap>
        <v-flex xs6 md5 pa-2>
          <api-autocomplete :resource="itemResource"
                            :input.sync="recipeOutput.component"
                            label="Produit"
                            item-text="name"
                            :rules="required"
                            :required="true"
                            :props="recipeOutputProps"
          />
        </v-flex>
        <v-flex xs6 md5 pa-2>
          <v-text-field v-model.number="recipeOutput.quantity"
                        type="number"
                        label="Quantité"
                        :rules="required"
                        required/>
        </v-flex>
        <v-flex xs12 md2 pa-2>
          <v-btn @click="addComponent()" primary>
            Ajouter
          </v-btn>
        </v-flex>
      </v-layout>
      <v-layout wrap>
        <v-flex xs-12 pa-2>
          <v-simple-table>
            <thead>
            <tr>
              <th class="text-left">Produit</th>
              <th class="text-left">Quantité</th>
              <th class="text-left">Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in outputs" :key="item.id">
              <td>{{ item.output.name }}</td>
              <td>{{ item.quantity }}</td>
              <td>
                <v-btn icon color="secondary" @click="confirmDeleteComponent(item)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>
            </tbody>
          </v-simple-table>
        </v-flex>
      </v-layout>
      <validation-dialog v-model="deleteComponentDialog" :confirm-cb="() => deleteComponent(outputToDelete)">
        <template v-slot:title>Supprimer un composant</template>
        <template v-slot:default v-if="outputToDelete">Êtes-vous sûr de vouloir supprimer le composant : {{
          outputToDelete.component.name }} ?
        </template>
      </validation-dialog>
    </template>
  </v-container>
</template>

<script lang="ts">
import { Component, Inject, Prop, Vue } from 'vue-property-decorator'
import RULES from '../_config/rules'
import { snackbarModule } from '../../_Common/Store'
import ValidationDialog from '../../_Darkanakin41/Component/ValidationDialog'
import ApiAutocomplete from './ApiAutocomplete.vue'
import RecipeOutputResource from '../../_Common/Resource/RecipeOutputResource'
import ItemResource from '../../_Common/Resource/ItemResource'
import Recipe from '../../_Common/Model/Recipe'
import RecipeOutput, { newRecipeOutput } from '../../_Common/Model/RecipeOutput'
import ApiSearch from '../../_Darkanakin41/ApiPlatform/Model/ApiSearch'

@Component({
  components: { ApiAutocomplete, ValidationDialog }
})
export default class RecipeOutputField extends Vue {
  @Inject('itemResource')
  itemResource: ItemResource

  @Inject('recipeOutputResource')
  recipeOutputResource: RecipeOutputResource

  @Prop()
  recipe: Recipe

  outputs: RecipeOutput[] = []

  recipeOutput: RecipeOutput | null = null
  outputToDelete: RecipeOutput | null = null

  loading: boolean = false
  deleteComponentDialog: boolean = false


  recipeOutputProps: string[] = ['id', 'name']


  required: {}[] = [
    RULES.required
  ]

  async created () {
    this.loading = true

    await this.updateComponents()
    this.resetComponentCreation()

    this.loading = false
  }

  async updateComponents () {
    this.outputs = await this.recipeOutputResource.get({
      searches: [{ field: 'recipe.id', query: this.recipe.id } as ApiSearch],
      props: ['id', 'quantity', 'recipe.name', 'output.name']
    })
  }

  async addComponent () {
    this.loading = true
    try {
      if(this.recipeOutput === null){
        return
      }
      await this.recipeOutputResource.post(this.recipeOutput)
      await this.updateComponents()
      this.resetComponentCreation()

      snackbarModule.setSnackbarEntry({
        color: 'success',
        icon: 'mdi-check',
        title: 'L\'ajout du produit à bien été effectué'
      })
    } catch (error) {
      snackbarModule.setSnackbarEntry({
        icon: 'mdi-alert-circle-outline',
        message: error.response.data['hydra:description'],
        color: 'error'
      })
    }
    this.loading = false
  }

  resetComponentCreation () {
    this.recipeOutput = newRecipeOutput(this.recipe)
  }

  confirmDeleteComponent (component: RecipeOutput) {
    this.deleteComponentDialog = true
    if (component.id) {
      this.outputToDelete = component
    }
  }

  async deleteComponent (component: RecipeOutput) {
    try {
      if (component.id) {
        await this.recipeOutputResource.delete(component.id)
        this.outputToDelete = null
        await this.updateComponents()
        this.resetComponentCreation()

        snackbarModule.setSnackbarEntry({
          icon: 'mdi-check',
          title: 'La suppression du produit à bien été effectué',
          color: 'success'
        })
      }
    } catch (error) {
      snackbarModule.setSnackbarEntry({
        icon: 'mdi-alert-circle-outline',
        message: error,
        color: 'error'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
