<template>
  <v-container fluid>
    <v-card>
      <v-sheet>
        <v-toolbar dark>
          <form>
            <v-text-field v-model="search"
                          append-icon="search"
                          label="Rechercher"
                          single-line
                          hide-details
            />
          </form>
          <v-spacer/>
          <v-toolbar-items>
            <v-btn :to="{name:'product-create'}">Créer</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <product-table :api-searches="apiSearches" :headers="headers"/>
      </v-sheet>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Loading from '../../../_Darkanakin41/Component/Loading.vue'
import ErrorManager from '../../../_Darkanakin41/Component/Form/ErrorManager.vue'
import { DataTableHeader } from 'vuetify'
import ApiSearch from '../../../_Darkanakin41/ApiPlatform/Model/ApiSearch'
import ProductTable from '../../Component/ProductTable.vue'

@Component({
  components: { ProductTable, Loading, ErrorManager }
})
export default class IndexPage extends Vue {

  readonly headers: DataTableHeader[] = [
    {
      text: 'Nom',
      value: 'name'
    },
    {
      text: 'Mod',
      value: 'mod.name'
    },
    {
      text: 'Type',
      value: 'type'
    },
    {
      text: 'Utilité',
      value: 'utility'
    },
    {
      text: 'Objet/Craft',
      value: 'output'
    },
    {
      text: 'Temps de Craft',
      value: 'craftingTime'
    },
    {
      text: 'Détail',
      value: 'detail',
      sortable: false
    }
  ]

  search: string = ''
  dialog: boolean = false

  get apiSearches (): ApiSearch[] | undefined {
    const search: ApiSearch [] = []
    if (this.search) {
      search.push(
        { field: 'name', query: this.search ? this.search : '' }
      )
    }
    return search
  }
}
</script>

<style lang="scss" scoped>
</style>
