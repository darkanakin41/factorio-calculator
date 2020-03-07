<template>

  <v-container fluid>
    <v-card>
      <v-sheet>
        <v-toolbar dark>
          <v-toolbar-title>
            Calculatrice
          </v-toolbar-title>
        </v-toolbar>

        <v-card-text>
          <v-layout wrap>
            <v-flex xs12 pa-2>
              <h2 class="align-center">
                Production de base
              </h2>
            </v-flex>
            <v-flex xs12 pa-2>
              <v-autocomplete
                  v-model="productSelected"
                  :items="products"
                  :search-input.sync="productSearch"
                  :loading="productLoading"
                  label="Produit"
                  item-text="name"
                  return-object
              />
            </v-flex>
          </v-layout>
          <v-layout wrap v-if="productCalculator !== null">
            <v-flex xs12 md4 pa-2>
              Avec une vitesse de fabrication de
              <b>{{ numberRound(productCalculator.craftingSpeed(),4) }}</b> :
            </v-flex>
            <v-flex xs12 md4 pa-2>
              Temps de fabrication :
              <b>{{ numberRound(productCalculator.craftingTime(), 4) }} seconde(s)</b>
            </v-flex>
            <v-flex xs12 md4 pa-2>
              Objet fabriqué par seconde :
              <b>{{ numberRound(productCalculator.outputPerSecond(), 4) }}</b>
            </v-flex>
          </v-layout>
          <v-divider v-if="productCalculator !== null"/>
          <v-layout wrap v-if="productCalculator !== null">
            <v-flex xs12 pa-2>
              <h2 class="align-center">
                Production de base pour les machines
              </h2>
            </v-flex>
            <v-flex xs12 md6 pa-2>
              <v-autocomplete
                  v-model="calculator.machine"
                  :items="machines"
                  label="Machine"
                  item-text="name"
                  return-object
              />
            </v-flex>
            <v-flex xs12 md6 pa-2>
              <v-autocomplete
                  v-model="calculator.transport"
                  :items="transports"
                  label="Transport"
                  item-text="name"
                  return-object
              />
            </v-flex>
          </v-layout>
          <v-layout wrap v-if="machineCalculator !== null">
            <v-flex xs12 md3 pa-2>
              Avec une vitesse de fabrication de
              <b>{{ numberRound(machineCalculator.craftingSpeed(),4) }}</b> :
            </v-flex>
            <v-flex xs12 md3 pa-2>
              Temps de fabrication :
              <b>{{ numberRound(machineCalculator.craftingTime(), 4) }} seconde(s)</b>
            </v-flex>
            <v-flex xs12 md3 pa-2>
              Objet fabriqué par seconde :
              <b>{{ numberRound(machineCalculator.outputPerSecond(), 4) }}</b>
            </v-flex>
            <v-flex xs12 md3 pa-2>
              Transport nécessaire (sortie) :
              <b>{{ numberRound(machineCalculator.outputTransportNeeded(), 4) }}</b>
            </v-flex>
            <v-flex xs12 pa-2>
              <v-simple-table>
                <thead>
                <tr>
                  <th class="text-left">Composant</th>
                  <th class="text-center">Besoin par craft (base)</th>
                  <th class="text-center">Entrée nécessaire par seconde</th>
                  <th class="text-center">Transport nécessaire</th>
                  <th class="text-center">Machine Supporté par Transport</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in calculator.components" :key="item.id">
                  <td>{{ item.component.name }}</td>
                  <td class="text-center">{{ item.quantity }}</td>
                  <td class="text-center">{{ numberRound(machineCalculator.componentInputNeeded(item)) }}</td>
                  <td class="text-center">{{ numberRound(machineCalculator.componentInputTransportNeeded(item)) }}</td>
                  <td class="text-center">{{
                    numberRound(machineCalculator.componentInputTransportSupportedMachine(item)) }}
                  </td>
                </tr>
                </tbody>
              </v-simple-table>
            </v-flex>
          </v-layout>
          <v-divider v-if="machineCalculator !== null"/>
          <v-layout wrap v-if="machineCalculator !== null">
            <v-flex xs12 pa-2>
              <h2 class="align-center">
                Ajout de modules
              </h2>
            </v-flex>
            <v-flex xs12 md2 pa-2>
              <v-text-field v-model.number="calculator.nbSpeedModule" label="Nombre"/>
            </v-flex>
            <v-flex xs12 md4 pa-2>
              <v-autocomplete
                  v-model="calculator.speedModule"
                  :items="speedModules"
                  label="Module de Vitesse"
                  item-text="name"
                  return-object
              />
            </v-flex>
            <v-flex xs12 md2 pa-2>
              <v-text-field v-model.number="calculator.nbProductivityModule" label="Nombre"/>
            </v-flex>
            <v-flex xs12 md4 pa-2>
              <v-autocomplete
                  v-model="calculator.productivityModule"
                  :items="productivityModules"
                  label="Module de Productivité"
                  item-text="name"
                  return-object
              />
            </v-flex>
          </v-layout>
          <v-layout wrap v-if="moduleCalculator !== null">
            <v-flex xs12 md6 pa-2>
              Bonus de vitesse :
              <b>{{ numberRound(numberToPercent(moduleCalculator.speedBonus()), 4) }}%</b>
            </v-flex>
            <v-flex xs12 md6 pa-2>
              Bonus de productivité :
              <b>{{ numberRound(numberToPercent(moduleCalculator.productivityBonus()), 4) }}%</b>
            </v-flex>

            <v-flex xs12 md3 pa-2>
              Avec une vitesse de fabrication de
              <b>{{ numberRound(moduleCalculator.craftingSpeed(),4) }}</b> :
            </v-flex>
            <v-flex xs12 md3 pa-2>
              Temps de fabrication :
              <b>{{ numberRound(moduleCalculator.craftingTime(), 4) }} seconde(s)</b>
            </v-flex>
            <v-flex xs12 md3 pa-2>
              Objet fabriqué par seconde :
              <b>{{ numberRound(moduleCalculator.outputPerSecond(), 4) }}</b>
            </v-flex>
            <v-flex xs12 md3 pa-2>
              Transport nécessaire (sortie) :
              <b>{{ numberRound(moduleCalculator.outputTransportNeeded(), 4) }}</b>
            </v-flex>
            <v-flex xs12 pa-2>
              <v-simple-table>
                <thead>
                <tr>
                  <th class="text-left">Composant</th>
                  <th class="text-center">Besoin par craft (base)</th>
                  <th class="text-center">Entrée nécessaire par seconde</th>
                  <th class="text-center">Transport nécessaire</th>
                  <th class="text-center">Machine Supporté par Transport</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in calculator.components" :key="item.id">
                  <td>{{ item.component.name }}</td>
                  <td class="text-center">{{ item.quantity }}</td>
                  <td class="text-center">{{ numberRound(moduleCalculator.componentInputNeeded(item)) }}</td>
                  <td class="text-center">{{ numberRound(moduleCalculator.componentInputTransportNeeded(item)) }}</td>
                  <td class="text-center">{{
                    numberRound(moduleCalculator.componentInputTransportSupportedMachine(item))}}
                  </td>
                </tr>
                </tbody>
              </v-simple-table>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-sheet>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Inject, Vue, Watch } from 'vue-property-decorator'
import Calculator, { newCalculator } from '../../../_Common/Type/Calculator'
import ProductResource from '../../../_Common/Resource/ProductResource'
import Product from '../../../_Common/Model/Product'
import CraftingComponentCalculator from '../../../_Common/Type/CraftingComponentCalculator'
import ApiSort from '../../../_Darkanakin41/ApiPlatform/Model/ApiSort'
import ProductComponentResource from '../../../_Common/Resource/ProductComponentResource'

@Component({
  components: {}
})
export default class HomePage extends Vue {
  @Inject('productResource')
  productResource: ProductResource

  @Inject('productComponentResource')
  productComponentResource: ProductComponentResource

  calculator: Calculator = null

  productSelected?: Product = null
  productSearch: string = ''
  productLoading: boolean = false

  products: Product[] = []
  transports: Product[] = []
  machines: Product[] = []
  speedModules: Product[] = []
  productivityModules: Product[] = []

  productCalculator?: CraftingComponentCalculator = null
  machineCalculator?: CraftingComponentCalculator = null
  moduleCalculator?: CraftingComponentCalculator = null

  sortBy: ApiSort = {
    field: 'name',
    desc: false
  }

  async created () {
    this.calculator = newCalculator()

    this.transports = await this.productResource.get({
      searches: [{ field: 'utility', query: 'transport' }],
      sort: this.sortBy,
      props: ['id', 'name', 'itemPerSecond']
    }) as Product[]
    this.machines = await this.productResource.get({
      searches: [{ field: 'utility', query: 'machine' }],
      sort: this.sortBy,
      props: ['id', 'name', 'craftingSpeed']
    }) as Product[]
    this.speedModules = await this.productResource.get({
      searches: [{ field: 'utility', query: 'module-speed' }],
      sort: this.sortBy,
      props: ['id', 'name', 'output', 'craftingTime', 'energyConsumption', 'speed']
    }) as Product[]
    this.productivityModules = await this.productResource.get({
      searches: [{
        field: 'utility',
        query: 'module-productivity'
      }], sort: this.sortBy,
      props: ['id', 'name', 'output', 'craftingTime', 'speed', 'polution', 'productivity', 'energyConsumption']
    }) as Product[]

  }

  @Watch('productSelected', { deep: true })
  async onProductSelectedUpdated () {
    this.calculator.product = this.productSelected

    this.calculator.components = await this.productComponentResource.get({
      searches: [{ field: 'product.id', query: this.calculator.product.id as string }],
      props: ['id', 'quantity', 'product.name', 'component.name']
    })
  }


  // productSearchUpdate = debounce(this.loadProducts, 500)

  @Watch('productSearch')
  async loadProducts () {

    if (this.productSearch === '') {
      this.products = []
      return
    }
    this.productLoading = true

    this.products = await this.productResource.get({
      sort: this.sortBy,
      props: ['id', 'name', 'output', 'craftingTime', 'components.quantity', 'components.component.name'],
      searches: [{ field: 'name', query: this.productSearch }]
    }) as Product[]

    this.productLoading = false
  }

  @Watch('calculator', { deep: true })
  onProductUpdate () {
    let calculator = null
    if (this.calculator.product !== undefined) {
      calculator = new CraftingComponentCalculator(this.calculator.product, { craftingSpeed: 1 })
    }
    this.productCalculator = calculator

    calculator = null
    if (this.calculator.machine !== undefined && this.calculator.transport !== undefined) {
      calculator = new CraftingComponentCalculator(this.calculator.product, this.calculator.machine)
      calculator.setTransport(this.calculator.transport)
    }
    this.machineCalculator = calculator

    calculator = null
    if (this.calculator.speedModule !== undefined || this.calculator.productivityModule !== undefined) {
      calculator = new CraftingComponentCalculator(this.calculator.product, this.calculator.machine)
      calculator.setTransport(this.calculator.transport)
      calculator.setSpeedModule(this.calculator.speedModule, this.calculator.nbSpeedModule)
      calculator.setProductivityModule(this.calculator.productivityModule, this.calculator.nbProductivityModule)
    }
    this.moduleCalculator = calculator
  }

}
</script>

<style lang="scss" scoped>
.v-divider {
  margin: 25px 0;
}
</style>
