<template>
  <v-container fluid>
    <v-row no-gutters justify="center" v-if="recipeComponent === null || loading">
      <v-progress-circular color="primary" size="50" indeterminate/>
    </v-row>
    <template v-else>
      <v-layout wrap>
        <v-flex xs6 md5 pa-2>
          <api-autocomplete :resource="itemResource"
                            :input.sync="recipeComponent.component"
                            label="Composant"
                            item-text="name"
                            :rules="required"
                            :required="true"
                            :props="recipeComponentProps"
          />
        </v-flex>
        <v-flex xs6 md5 pa-2>
          <v-text-field v-model.number="recipeComponent.quantity"
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
            <tr v-for="item in components" :key="item.id">
              <td>{{ item.component.name }}</td>
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
      <validation-dialog v-model="deleteComponentDialog" :confirm-cb="() => deleteComponent(componentToDelete)">
        <template v-slot:title>Supprimer un composant</template>
        <template v-slot:default v-if="componentToDelete">Êtes-vous sûr de vouloir supprimer le composant : {{
          componentToDelete.component.name }} ?
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
import RecipeComponentResource from '../../_Common/Resource/RecipeComponentResource'
import ItemResource from '../../_Common/Resource/ItemResource'
import Recipe from '../../_Common/Model/Recipe'
import RecipeComponent, { newRecipeComponent } from '../../_Common/Model/RecipeComponent'
import ApiSearch from '../../_Darkanakin41/ApiPlatform/Model/ApiSearch'

@Component({
  components: { ApiAutocomplete, ValidationDialog }
})
export default class RecipeComponentField extends Vue {
  @Inject('itemResource')
  itemResource: ItemResource

  @Inject('recipeComponentResource')
  recipeComponentResource: RecipeComponentResource

  @Prop()
  recipe: Recipe

  components: RecipeComponent[] = []

  recipeComponent: RecipeComponent | null = null
  componentToDelete: RecipeComponent | null = null

  loading: boolean = false
  deleteComponentDialog: boolean = false


  recipeComponentProps: string[] = ['id', 'name']


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
    this.components = await this.recipeComponentResource.get({
      searches: [{ field: 'recipe.id', query: this.recipe.id } as ApiSearch],
      props: ['id', 'quantity', 'recipe.name', 'component.name']
    })
  }

  async addComponent () {
    this.loading = true
    try {
      if(this.recipeComponent === null){
        return
      }
      await this.recipeComponentResource.post(this.recipeComponent)
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
    this.recipeComponent = newRecipeComponent(this.recipe)
  }

  confirmDeleteComponent (component: RecipeComponent) {
    this.deleteComponentDialog = true
    if (component.id) {
      this.componentToDelete = component
    }
  }

  async deleteComponent (component: RecipeComponent) {
    try {
      if (component.id) {
        await this.recipeComponentResource.delete(component.id)
        this.componentToDelete = null
        await this.updateComponents()
        this.resetComponentCreation()

        snackbarModule.setSnackbarEntry({
          icon: 'mdi-check',
          title: 'La suppression du composant à bien été effectué',
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
