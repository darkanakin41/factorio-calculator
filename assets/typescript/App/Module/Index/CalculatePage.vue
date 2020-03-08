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
                  v-model="recipeSelected"
                  :items="recipes"
                  :search-input.sync="recipeSearch"
                  :loading="recipeLoading"
                  label="Recette"
                  item-text="name"
                  return-object
              />
            </v-flex>
          </v-layout>
          <v-layout wrap v-if="recipeCalculator !== null">
            <v-flex xs12 md6 pa-2>
              Avec une vitesse de fabrication de
              <b>{{ numberRound(recipeCalculator.craftingSpeed(),4) }}</b> :
            </v-flex>
            <v-flex xs12 md6 pa-2>
              Temps de fabrication :
              <b>{{ numberRound(recipeCalculator.craftingTime(), 4) }} seconde(s)</b>
            </v-flex>
          </v-layout>
          <v-divider v-if="recipeCalculator !== null"/>
          <v-layout wrap v-if="recipeCalculator !== null">
            <v-flex xs12 pa-2>
              <h2 class="align-center">
                Production de base pour les machines
              </h2>
            </v-flex>
            <v-flex xs12 md6 pa-2>
              <v-autocomplete
                  v-model="calculatorData.machine"
                  :items="machines"
                  label="Machine"
                  item-text="name"
                  return-object
              />
            </v-flex>
            <v-flex xs12 md6 pa-2>
              <v-autocomplete
                  v-model="calculatorData.transport"
                  :items="transports"
                  label="Transport"
                  item-text="name"
                  return-object
              />
            </v-flex>
          </v-layout>
          <v-layout wrap v-if="machineCalculator !== null">
            <v-flex xs12 md6 pa-2>
              Avec une vitesse de fabrication de
              <b>{{ numberRound(machineCalculator.craftingSpeed(),4) }}</b> :
            </v-flex>
            <v-flex xs12 md6 pa-2>
              Temps de fabrication :
              <b>{{ numberRound(machineCalculator.craftingTime(), 4) }} seconde(s)</b>
            </v-flex>
            <v-flex xs12 pa-2>
              <calculator-component-and-output :crafting-calculator="machineCalculator"
                                               :calculator-data="calculatorData"/>
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
              <v-text-field v-model.number="calculatorData.nbSpeedModule" label="Nombre"/>
            </v-flex>
            <v-flex xs12 md4 pa-2>
              <v-autocomplete
                  v-model="calculatorData.speedModule"
                  :items="speedModules"
                  label="Module de Vitesse"
                  item-text="name"
                  return-object
              />
            </v-flex>
            <v-flex xs12 md2 pa-2>
              <v-text-field v-model.number="calculatorData.nbProductivityModule" label="Nombre"/>
            </v-flex>
            <v-flex xs12 md4 pa-2>
              <v-autocomplete
                  v-model="calculatorData.productivityModule"
                  :items="productivityModule"
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

            <v-flex xs12 md6 pa-2>
              Avec une vitesse de fabrication de
              <b>{{ numberRound(moduleCalculator.craftingSpeed(),4) }}</b> :
            </v-flex>
            <v-flex xs12 md6 pa-2>
              Temps de fabrication :
              <b>{{ numberRound(moduleCalculator.craftingTime(), 4) }} seconde(s)</b>
            </v-flex>
            <v-flex xs12 pa-2>
              <calculator-component-and-output :crafting-calculator="moduleCalculator"
                                               :calculator-data="calculatorData"/>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-sheet>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Inject, Vue, Watch } from 'vue-property-decorator'
import CalculatorData, { newCalculatorData } from '../../../_Common/Type/CalculatorData'
import RecipeResource from '../../../_Common/Resource/RecipeResource'
import CraftingCalculator from '../../../_Common/Type/CraftingCalculator'
import ApiSort from '../../../_Darkanakin41/ApiPlatform/Model/ApiSort'
import RecipeComponentResource from '../../../_Common/Resource/RecipeComponentResource'
import Recipe from '../../../_Common/Model/Recipe'
import RecipeOutputResource from '../../../_Common/Resource/RecipeOutputResource'
import ItemResource from '../../../_Common/Resource/ItemResource'
import Item from '../../../_Common/Model/Item'
import CalculatorComponentAndOutput from '../../Component/CalculatorComponentAndOutput.vue'
import debounce from 'lodash/debounce'

@Component({
  components: { CalculatorComponentAndOutput }
})
export default class HomePage extends Vue {
  @Inject('recipeResource')
  recipeResource: RecipeResource

  @Inject('recipeComponentResource')
  recipeComponentResource: RecipeComponentResource

  @Inject('recipeOutputResource')
  recipeOutputResource: RecipeOutputResource

  @Inject('itemResource')
  itemResource: ItemResource

  calculatorData: CalculatorData | null = null

  recipeSelected: Recipe | null = null
  recipeSearch: string = ''
  recipeLoading: boolean = false

  recipes: Recipe[] = []
  transports: Item[] = []
  machines: Item[] = []
  speedModules: Item[] = []
  productivityModule: Item[] = []

  recipeCalculator: CraftingCalculator | null = null
  machineCalculator: CraftingCalculator | null = null
  moduleCalculator: CraftingCalculator | null = null

  sortBy: ApiSort = {
    field: 'name',
    desc: false
  }

  async created () {
    this.calculatorData = newCalculatorData()

    this.transports = await this.itemResource.get({
      searches: [{ field: 'utility', query: 'transport' }],
      sort: this.sortBy,
      props: ['id', 'name', 'itemPerSecond']
    }) as Item[]
    this.machines = await this.itemResource.get({
      searches: [{ field: 'utility', query: 'machine' }],
      sort: this.sortBy,
      props: ['id', 'name', 'craftingSpeed']
    }) as Item[]
    this.speedModules = await this.itemResource.get({
      searches: [{ field: 'utility', query: 'module-speed' }],
      sort: this.sortBy,
      props: ['id', 'name', 'output', 'craftingTime', 'energyConsumption', 'speed']
    }) as Item[]
    this.productivityModule = await this.itemResource.get({
      searches: [{
        field: 'utility',
        query: 'module-productivity'
      }], sort: this.sortBy,
      props: ['id', 'name', 'output', 'craftingTime', 'speed', 'polution', 'recipeivity', 'energyConsumption']
    }) as Item[]

  }

  @Watch('recipeSelected', { deep: true })
  async onRecipeSelectedUpdated () {
    if (this.recipeSelected === null) {
      return
    }
    this.calculatorData.recipe = this.recipeSelected

    this.calculatorData.components = await this.recipeComponentResource.get({
      searches: [{ field: 'recipe.id', query: this.calculatorData.recipe.id as string }],
      props: ['id', 'quantity', 'recipe.name', 'component.name']
    })

    this.calculatorData.outputs = await this.recipeOutputResource.get({
      searches: [{ field: 'recipe.id', query: this.calculatorData.recipe.id as string }],
      props: ['id', 'quantity', 'recipe.name', 'output.name']
    })
  }

  @Watch('recipeSearch')
  recipeSearchUpdate = debounce(this.loadRecipes, 500)

  async loadRecipes () {

    if (this.recipeSearch === '') {
      this.recipes = []
      return
    }
    this.recipeLoading = true

    this.recipes = await this.recipeResource.get({
      sort: this.sortBy,
      props: ['id', 'name', 'output', 'craftingTime', 'outputs.quantity', 'outputs.component.name'],
      searches: [{ field: 'name', query: this.recipeSearch }]
    }) as Recipe[]

    this.recipeLoading = false
  }

  @Watch('calculatorData', { deep: true })
  onRecipeUpdate () {
    let craftingCalculator = null
    if (this.calculatorData.recipe !== undefined) {
      craftingCalculator = new CraftingCalculator(this.calculatorData.recipe, { craftingSpeed: 1 })
    }
    this.recipeCalculator = craftingCalculator

    craftingCalculator = null
    if (this.calculatorData.machine !== undefined && this.calculatorData.transport !== undefined) {
      craftingCalculator = new CraftingCalculator(this.calculatorData.recipe, this.calculatorData.machine)
      craftingCalculator.setTransport(this.calculatorData.transport)
    }
    this.machineCalculator = craftingCalculator

    craftingCalculator = null
    if (this.calculatorData.speedModule !== undefined || this.calculatorData.productivityModule !== undefined) {
      craftingCalculator = new CraftingCalculator(this.calculatorData.recipe, this.calculatorData.machine)
      craftingCalculator.setTransport(this.calculatorData.transport)
      craftingCalculator.setSpeedModule(this.calculatorData.speedModule, this.calculatorData.nbSpeedModule)
      craftingCalculator.setProductivityModule(this.calculatorData.productivityModule, this.calculatorData.nbProductivityModule)
    }
    this.moduleCalculator = craftingCalculator
  }

}
</script>

<style lang="scss" scoped>
.v-divider {
  margin: 25px 0;
}
</style>
