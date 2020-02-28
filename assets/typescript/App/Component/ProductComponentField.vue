<template>
  <v-container fluid>
    <v-row no-gutters justify="center" v-if="productComponent === null || loading">
      <v-progress-circular color="primary" size="50" indeterminate/>
    </v-row>
    <template v-else>
      <v-layout wrap>
        <v-flex xs6 md5 pa-2>
          <v-autocomplete label="Produit"
                          v-model="productComponent.component"
                          :items="products"
                          item-text="name"
                          return-object
                          :rules="required"
                          required/>
        </v-flex>
        <v-flex xs6 md5 pa-2>
          <v-text-field v-model.number="productComponent.quantity"
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
import Product from '../../_Common/Model/Product'
import ProductComponent, { newProductComponent } from '../../_Common/Model/ProductComponent'
import ProductResource from '../../_Common/Resource/ProductResource'
import RULES from '../_config/rules'
import { snackbarModule } from '../../_Common/Store'
import ProductComponentResource from '../../_Common/Resource/ProductComponentResource'
import ValidationDialog from '../../_Darkanakin41/Component/ValidationDialog'

@Component({
  components: { ValidationDialog }
})
export default class ProductComponentField extends Vue {
  @Inject('productResource')
  productResource: ProductResource

  @Inject('productComponentResource')
  productComponentResource: ProductComponentResource

  @Prop()
  product: Product

  components: ProductComponent[]

  products: Product[] = []

  productComponent?: ProductComponent = null
  componentToDelete?: ProductComponent = null

  loading: boolean = false
  deleteComponentDialog: boolean = false

  required: {}[] = [
    RULES.required
  ]

  async created () {
    this.loading = true

    await this.updateComponents()
    await this.updateProductsList()
    this.resetComponentCreation()

    this.loading = false
  }

  async updateComponents () {
    this.components = await this.productComponentResource.get({
      searches: [{ field: 'product.id', query: this.product.id }],
      props: ['id', 'quantity', 'product.name', 'component.name']
    })
  }

  async updateProductsList () {
    this.products = await this.productResource.get()
  }

  async addComponent () {
    this.loading = true
    try {
      await this.productComponentResource.post(this.productComponent)
      await this.updateComponents()
      this.updateProductsList()
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
    this.productComponent = newProductComponent(this.product)
  }

  confirmDeleteComponent (component: ProductComponent) {
    this.deleteComponentDialog = true
    if (component.id) {
      this.componentToDelete = component
    }
  }

  async deleteComponent (component: ProductComponent) {
    try {
      if (component.id) {
        await this.productComponentResource.delete(component.id)
        this.componentToDelete = null
        await this.updateComponents()
        this.updateProductsList()
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
