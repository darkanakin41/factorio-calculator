<template>
  <v-tabs slider-color="primary">
    <v-tab ripple>
      Composants
    </v-tab>
    <v-tab ripple>
      Produits
    </v-tab>
    <v-tab-item>
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
        <tr v-for="item in calculatorData.components" :key="item.id">
          <td>{{ item.component.name }}</td>
          <td class="text-center">{{ item.quantity }}</td>
          <td class="text-center">{{ numberRound(craftingCalculator.componentInputNeeded(item)) }}</td>
          <td class="text-center">{{ numberRound(craftingCalculator.componentInputTransportNeeded(item)) }}</td>
          <td class="text-center">{{
            numberRound(craftingCalculator.componentInputTransportSupportedMachine(item))}}
          </td>
        </tr>
        </tbody>
      </v-simple-table>
    </v-tab-item>
    <v-tab-item>
      <v-simple-table>
        <thead>
        <tr>
          <th class="text-left">Produit</th>
          <th class="text-center">Produit par craft</th>
          <th class="text-center">Produit par seconde</th>
          <th class="text-center">Transport nécessaire</th>
          <th class="text-center">Machine Supporté par Transport</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in calculatorData.outputs" :key="item.id">
          <td>{{ item.output.name }}</td>
          <td class="text-center">{{ item.quantity }}</td>
          <td class="text-center">{{ numberRound(craftingCalculator.outputPerCraft(item)) }}</td>
          <td class="text-center">{{ numberRound(craftingCalculator.outputTransportNeeded(item)) }}</td>
          <td class="text-center">{{ numberRound(craftingCalculator.outputSupporterMachine(item))}}</td>
        </tr>
        </tbody>
      </v-simple-table>
    </v-tab-item>
  </v-tabs>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import CraftingCalculator from '../../_Common/Type/CraftingCalculator'
import CalculatorData from '../../_Common/Type/CalculatorData'

@Component({
  components: {}
})
export default class CalculatorComponentAndOutput extends Vue {
  @Prop({ required: true })
  craftingCalculator: CraftingCalculator

  @Prop({ required: true })
  calculatorData: CalculatorData
}
</script>

<style lang="scss" scoped>
</style>
