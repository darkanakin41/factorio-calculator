<template>
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
</template>

<script lang="ts">
import { Component, Inject, Prop, Vue, Watch } from 'vue-property-decorator'
import Product from '../../_Common/Model/Product'
import ProductResource from '../../_Common/Resource/ProductResource'
import { DataOptions, DataTableHeader } from 'vuetify'
import ApiSort from '../../_Darkanakin41/ApiPlatform/Model/ApiSort'
import ApiSearch from '../../_Darkanakin41/ApiPlatform/Model/ApiSearch'
import { PRODUCT_TYPE, PRODUCT_UTILITY } from '../../_Common/Nomenclature'

@Component({
  components: {}
})
export default class ProductTable extends Vue {
  @Inject('productResource')
  productResource: ProductResource

  @Prop({ required: true })
  headers: DataTableHeader[]

  @Prop({ default: [] })
  apiSearches: ApiSearch[]

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

  loading: Boolean = false

  items?: Product[] = []
  itemsCount: number = -1

  PRODUCT_TYPE = PRODUCT_TYPE
  PRODUCT_UTILITY = PRODUCT_UTILITY

  get apiSort (): ApiSort | undefined {
    if (this.options.sortBy.length > 0) {
      return {
        field: this.options.sortBy[0],
        desc: this.options.sortDesc[0]
      }
    }
    return undefined
  }

  @Watch('options.page')
  @Watch('options.itemsPerPage')
  @Watch('apiSort')
  async getData () {
    this.loading = true
    try {
      const res = await this.productResource.get({
        page: { page: this.options.page, itemsPerPage: this.options.itemsPerPage },
        props: ['id', 'name', 'type', 'mod.name', 'utility', 'output', 'craftingTime'],
        searches: this.apiSearches,
        sort: this.apiSort
      })
      this.items = res
      this.itemsCount = res.$hydra['hydra:totalItems']
    } finally {
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
