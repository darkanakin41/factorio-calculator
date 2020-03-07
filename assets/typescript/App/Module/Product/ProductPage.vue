<template>
  <v-container fluid>
    <v-card>
      <v-sheet>
        <v-toolbar dark>
          <v-toolbar-title>
            {{ isCreate() ? 'Création d\'un produit' : 'Modification du produit ' + product.name }}
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
            <v-flex xs12 md6 pa-2>
              <v-text-field v-model="product.name"
                            label="Nom"
                            :rules="required"
                            required/>
            </v-flex>

            <v-flex xs6 md6 pa-2>
              <api-autocomplete :resource="modResource"
                                label="Mod"
                                item-text="name"
                                :item.sync="product.mod"
              />
            </v-flex>
            <v-flex xs12 md6 pa-2>
              <v-text-field v-model.number="product.output"
                            type="number"
                            label="Item par craft"
                            :rules="required"
                            required/>
            </v-flex>
            <v-flex xs12 md6 pa-2>
              <v-text-field v-model.number="product.craftingTime"
                            type="number"
                            label="Temps de craft"
                            :rules="required"
                            required/>
            </v-flex>
            <v-flex xs12 md6 pa-2>
              <v-select
                  v-model="product.type"
                  :items="PRODUCT_TYPE"
                  label="Type"
                  item-text="label"
                  item-value="value"
                  :rules="required"
                  required
              ></v-select>
            </v-flex>
            <v-flex xs12 md6 pa-2>
              <v-select
                  v-model="product.utility"
                  :items="PRODUCT_UTILITY"
                  label="Utilité"
                  item-text="label"
                  item-value="value"
                  :rules="required"
                  required
              ></v-select>
            </v-flex>
            <v-flex xs12 md12 pa-2 v-if="product.utility === 'transport' ">
              <v-text-field v-model.number="product.itemPerSecond"
                            type="number"
                            label="Objet par Seconde"
                            :rules="required"
                            required/>
            </v-flex>
            <v-flex xs12 md12 pa-2 v-if="product.utility === 'machine' ">
              <v-text-field v-model.number="product.craftingSpeed"
                            type="number"
                            label="Vitesse de Craft"
                            :rules="required"
                            required/>
            </v-flex>
            <v-flex xs12 md6 pa-2
                    v-if="['module-efficiency','module-speed', 'module-productivity'].indexOf(product.utility) !== -1">
              <v-text-field v-model.number="product.energyConsumption"
                            type="number"
                            label="Consommation Energetique"
                            :rules="required"
                            required/>
            </v-flex>
            <v-flex xs12 md6 pa-2 v-if="['module-speed', 'module-productivity'].indexOf(product.utility) !== -1">
              <v-text-field v-model.number="product.speed"
                            type="number"
                            label="Vitesse"
                            :rules="required"
                            required/>
            </v-flex>
            <v-flex xs12 md6 pa-2 v-if="['module-efficiency', 'module-productivity'].indexOf(product.utility) !== -1">
              <v-text-field v-model.number="product.polution"
                            type="number"
                            label="Polution"
                            :rules="required"
                            required/>
            </v-flex>
            <v-flex xs12 md6 pa-2 v-if="['module-productivity'].indexOf(product.utility) !== -1">
              <v-text-field v-model.number="product.productivity"
                            type="number"
                            label="Productivité"
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
          <product-component-field :product.sync="product"/>
        </v-card-text>
      </v-form>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Inject, Prop, Vue } from 'vue-property-decorator'
import Product, { newProduct } from '../../../_Common/Model/Product'
import ProductResource from '../../../_Common/Resource/ProductResource'
import { PRODUCT_TYPE, PRODUCT_UTILITY } from '../../../_Common/Nomenclature'
import { snackbarModule } from '../../../_Common/Store'
import { SnackbarEntry } from '../../../_Darkanakin41/Store/SnackbarModule'
import RULES from '../../_config/rules'
import ProductComponentField from '../../Component/ProductComponentField.vue'
import ApiAutocomplete from '../../Component/ApiAutocomplete.vue'
import ModResource from '../../../_Common/Resource/ModResource'

@Component({
  components: { ApiAutocomplete, ProductComponentField }
})
export default class ProductPage extends Vue {
  @Inject('productResource')
  productResource: ProductResource

  @Inject('modResource')
  modResource: ModResource

  @Prop({ default: null })
  id?: number

  PRODUCT_TYPE = PRODUCT_TYPE
  PRODUCT_UTILITY = PRODUCT_UTILITY

  loading: Boolean = false

  search: string = ''
  product?: Product = null
  dialog: boolean = false

  required: {}[] = [
    RULES.required
  ]

  async created () {
    await this.loadData()
  }

  async loadData () {
    this.loading = true
    try {
      if (this.id === null) {
        this.product = newProduct()
      } else {
        this.product = await this.productResource.getOne(this.id)
      }
    } finally {
    }
    this.loading = false
  }

  isCreate () {
    return this.product === null || this.product.id === null
  }

  async save () {
    this.loading = true
    try {
      let snackback: SnackbarEntry = {
        color: 'success',
        icon: 'mdi-check'
      }

      if(this.product.mod === undefined){
        this.product.mod = null
      }
      if (this.product.id) {
        this.product = await this.productResource.patch(this.product.id, this.product)
        snackback.title = 'La modification du produit à bien été effectuée'
      } else {
        this.product = await this.productResource.post(this.product)
        snackback.title = 'L\'ajout du produit à bien été effectué'
        await this.$router.push({ name: 'product-edit', params: { id: this.product.id } })
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
