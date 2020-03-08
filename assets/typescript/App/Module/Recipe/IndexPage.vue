<template>
  <v-container fluid>
    <v-card>
      <v-sheet>
        <v-toolbar dark>
            <v-text-field v-model="search"
                          append-icon="search"
                          label="Rechercher"
                          single-line
                          hide-details
            />
          <v-spacer/>
          <v-toolbar-items>
            <v-btn :to="{name:'recipe-create'}">Créer</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <recipe-table :api-searches="apiSearches" :headers="headers"/>
      </v-sheet>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Inject, Vue } from 'vue-property-decorator'
import { DataTableHeader } from 'vuetify'
import ApiSearch from '../../../_Darkanakin41/ApiPlatform/Model/ApiSearch'
import Mod from '../../../_Common/Model/Mod'
import ItemResource from '../../../_Common/Resource/ItemResource'
import ItemTable from '../../Component/ItemTable.vue'
import RecipeTable from '../../Component/RecipeTable.vue'

@Component({
  components: { RecipeTable, ItemTable }
})
export default class IndexPage extends Vue {
  @Inject('itemResource')
  itemResource: ItemResource

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
      text: 'Temps de craft',
      value: 'craftingTime'
    },
    {
      text: 'Détail',
      value: 'detail',
      sortable: false
    }
  ]

  search: string = ''

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
