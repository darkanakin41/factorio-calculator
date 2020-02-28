<template>
  <v-container fluid>
    <v-card>
      <v-sheet>
        <v-toolbar dark>
          <form v-on:submit.prevent="getData()">
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
        <v-data-table :headers="headers"
                      :items="items"
                      :options.sync="options"
                      :server-items-length="itemsCount"
                      :loading="loading"
        >
          <template v-slot:item.type="{ item }">
            {{ getNomenclatureLabel(PRODUCT_TYPE, item.type) }}
          </template>
          <template v-slot:item.utility="{ item }">
            {{ getNomenclatureLabel(PRODUCT_UTILITY, item.utility) }}
          </template>
          <template v-slot:item.craftingTime="{ item }">
            {{ item.craftingTime }} s
          </template>
          <template v-slot:item.detail="{ item }">
            <v-btn :to="{name:'product-edit', params:{id: item.id}}" text rounded>
              <i class="fa fa-edit"/>
            </v-btn>
          </template>
        </v-data-table>
      </v-sheet>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Inject, Vue, Watch } from 'vue-property-decorator'
import Loading from '../../../_Darkanakin41/Component/Loading.vue'
import ErrorManager from '../../../_Darkanakin41/Component/Form/ErrorManager.vue'
import Product from '../../../_Common/Model/Product'
import ProductResource from '../../../_Common/Resource/ProductResource'
import { DataOptions, DataTableHeader } from 'vuetify'
import ApiSort from '../../../_Darkanakin41/ApiPlatform/Model/ApiSort'
import ApiSearch from '../../../_Darkanakin41/ApiPlatform/Model/ApiSearch'
import { PRODUCT_TYPE, PRODUCT_UTILITY } from '../../../_Common/Nomenclature'

@Component({
  components: {Loading, ErrorManager }
})
export default class IndexPage extends Vue {
  @Inject('productResource')
  productResource: ProductResource

  options: DataOptions = {
    page: 1,
    itemsPerPage: 10,
    sortBy: ['name'],
    sortDesc: [false],
    groupBy: [],
    groupDesc: [],
    multiSort: false,
    mustSort: false
  }

  PRODUCT_TYPE = PRODUCT_TYPE
  PRODUCT_UTILITY = PRODUCT_UTILITY

  readonly headers: DataTableHeader[] = [
    {
      text: 'Nom',
      value: 'name'
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

  loading: Boolean = false
  items: Product[] = []
  itemsCount: number = 0

  search: string = ''
  selected?: Product = null
  dialog: boolean = false

  get apiSort (): ApiSort | undefined {
    if (this.options.sortBy.length > 0) {
      return {
        field: this.options.sortBy[0],
        desc: this.options.sortDesc[0]
      }
    }
    return undefined
  }

  get apiSearches (): ApiSearch[] | undefined {
    const search: ApiSearch [] = []
    if (this.search) {
      search.push(
        { field: 'name', query: this.search ? this.search : '' }
      )
    }
    return search
  }

  @Watch('options.page')
  @Watch('options.itemsPerPage')
  @Watch('apiSort')
  async getData () {
    this.loading = true
    try {
      const res = await this.productResource.get({
        page: { page: this.options.page, itemsPerPage: this.options.itemsPerPage },
        props: ['id', 'name', 'type', 'utility', 'output', 'craftingTime'],
        searches: this.apiSearches,
        sort: this.apiSort
      })
      this.items = res
      this.itemsCount = res.$hydra['hydra:totalItems']
    } finally {
      this.loading = false
    }
  }

  @Watch('selected')
  onSelectedUpdate (newSelected, oldSelected) {
    if (newSelected === undefined && oldSelected !== undefined) {
      this.getData()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
