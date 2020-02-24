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
          <v-text-field v-model="productComponent.quantity"
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
                <!--            <v-btn v-on:click="removeComponent(item)" text rounded>-->
                <!--              <i class="fa fa-trash"/>-->
                <!--            </v-btn>-->
              </td>
            </tr>
            </tbody>
          </v-simple-table>
        </v-flex>
      </v-layout>
    </template>
  </v-container>
</template>

<script lang="ts">
import { Component, Inject, Prop, Vue } from 'vue-property-decorator'
import Product from '../../_Common/Model/Product'
import ProductComponent, { newProductComponent } from '../../_Common/Model/ProductComponent'
import ProductResource from '../../_Common/Resource/ProductResource'
import RULES from '../_config/rules'
import { SnackbarEntry } from '../../_Darkanakin41/Store/SnackbarModule'
import { snackbarModule } from '../../_Common/Store'
import ProductComponentResource from '../../_Common/Resource/ProductComponentResource'

@Component({
  components: {}
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

  loading: boolean = false

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
    // let apiSearch:ApiSearch[] = [{field:'"product.id"', query: this.product.id}];
    this.components = await this.productComponentResource.get({
      searches: [{ field: '"product.id"', query: this.product.id }],
      props: ['id', 'quantity', 'product.name', 'component.name']
    })
  }

  async updateProductsList () {
    let products = await this.productResource.get()
    // this.products = products.filter((item: Product) => {
    //   return this.components.find((component: ProductComponent) => {
    //     return component.component.id === item.id
    //   }) === undefined
    // })

    this.products = products
  }

  async addComponent () {
    this.loading = true
    try {
      this.productComponent = await this.productComponentResource.post(this.productComponent)
      this.product.components.push(this.productComponent)

      let snackback: SnackbarEntry = {
        color: 'success',
        icon: 'mdi-check',
        title: 'L\'ajout du produit à bien été effectué'
      }

      this.updateProductsList()
      this.resetComponentCreation()
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

  resetComponentCreation () {
    this.productComponent = newProductComponent(this.product)
  }

}
</script>

<style lang="scss" scoped>
</style>
