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
            <v-btn :to="{name:'mod-create'}">Créer</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-data-table :headers="headers"
                      :items="items"
                      :options.sync="options"
                      :server-items-length="itemsCount"
                      :loading="loading"
        >
          <template v-slot:item.websiteUrl="{ value }">
            <a :href="value" target="_blank" v-if="value">
              Official Website
            </a>
          </template>
          <template v-slot:item.sourceUrl="{ value }">
            <a :href="value" target="_blank" v-if="value">
              Sources
            </a>
          </template>
          <template v-slot:item.detail="{ item }">
            <v-btn :to="{name:'mod-edit', params:{id: item.id}}" text rounded>
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
import { DataOptions, DataTableHeader } from 'vuetify'
import ApiSort from '../../../_Darkanakin41/ApiPlatform/Model/ApiSort'
import ApiSearch from '../../../_Darkanakin41/ApiPlatform/Model/ApiSearch'
import Mod from '../../../_Common/Model/Mod'
import ModResource from '../../../_Common/Resource/ModResource'
import debounce from 'lodash/debounce'

@Component({
  components: { Loading, ErrorManager }
})
export default class IndexPage extends Vue {
  @Inject('modResource')
  modResource: ModResource

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

  readonly headers: DataTableHeader[] = [
    {
      text: 'Nom',
      value: 'name'
    },
    {
      text: 'Website URL',
      value: 'websiteUrl'
    },
    {
      text: 'Source URL',
      value: 'sourceUrl'
    },
    {
      text: 'Détail',
      value: 'detail',
      sortable: false
    }
  ]

  loading: Boolean = false
  items: Mod[] = []
  itemsCount: number = 0

  search: string = ''
  selected?: Mod = null
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

  @Watch('search')
  recipeSearchUpdate = debounce(this.getData, 500)

  @Watch('options.page')
  @Watch('options.itemsPerPage')
  @Watch('apiSort')
  async getData () {
    this.loading = true
    try {
      const res = await this.modResource.get({
        page: { page: this.options.page, itemsPerPage: this.options.itemsPerPage },
        props: ['id', 'name', 'websiteUrl', 'sourceUrl'],
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
