<template>
  <v-data-table :headers="headers"
                :items="items"
                :options.sync="options"
                :server-items-length="itemsCount"
                :loading="loading"
  >
    <template v-slot:item.craftingTime="{ item }">
      {{ item.craftingTime }} s
    </template>
    <template v-slot:item.detail="{ item }">
      <v-btn :to="{name:'recipe-edit', params:{id: item.id}}" text rounded>
        <i class="fa fa-edit"/>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { Component, Inject, Prop, Vue, Watch } from 'vue-property-decorator'
import { DataOptions, DataTableHeader } from 'vuetify'
import ApiSort from '../../_Darkanakin41/ApiPlatform/Model/ApiSort'
import ApiSearch from '../../_Darkanakin41/ApiPlatform/Model/ApiSearch'
import RecipeResource from '../../_Common/Resource/RecipeResource'
import Recipe from '../../_Common/Model/Recipe'
import debounce from 'lodash/debounce'

@Component({
  components: {}
})
export default class RecipeTable extends Vue {
  @Inject('recipeResource')
  recipeResource: RecipeResource

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

  items?: Recipe[] = []
  itemsCount: number = -1

  get apiSort (): ApiSort | undefined {
    if (this.options.sortBy.length > 0) {
      return {
        field: this.options.sortBy[0],
        desc: this.options.sortDesc[0]
      }
    }
    return undefined
  }

  @Watch('apiSearches')
  recipeSearchUpdate = debounce(this.getData, 500)

  @Watch('options.page')
  @Watch('options.itemsPerPage')
  @Watch('apiSort')
  async getData () {
    this.loading = true
    try {
      const res = await this.recipeResource.get({
        page: { page: this.options.page, itemsPerPage: this.options.itemsPerPage },
        props: ['id', 'name', 'mod.name', 'craftingTime'],
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
