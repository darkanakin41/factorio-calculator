<template>
  <v-autocomplete
      v-model="selected"
      v-on:input="updateValue($event)"
      :items="items"
      :search-input.sync="search"
      :loading="loading"
      :label="label"
      :item-text="itemText"
      return-object
      :rules="rules"
      :required="required"
      :clearable="!required"/>
</template>


<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import AbstractApiResource from '../../_Darkanakin41/ApiPlatform/Resource/AbstractApiResource'
import debounce from 'lodash/debounce'

@Component({})
export default class ApiAutocomplete extends Vue {
  @Prop()
  item: any
  @Prop({ required: true })
  resource: AbstractApiResource
  @Prop({ required: true })
  label: string
  @Prop({ required: true })
  itemText: string
  @Prop({ default: false })
  required: boolean
  @Prop({ default: undefined })
  props: string[]

  @Prop({})
  rules: any

  selected: any = null
  items: any = []

  search: string = ''
  loading: boolean = false

  async created () {
    this.loading = true
    if (typeof this.item === 'string') {
      let valueSplit = this.item.split('/')
      let id = valueSplit[valueSplit.length - 1]
      this.selected = await this.resource.getOne(id)
    }
    this.loading = false
  }

  updateValue($event){
    this.$emit('update:input', $event)
  }


  @Watch('search')
  recipeSearchUpdate = debounce(this.loadData, 500)

  async loadData () {
    this.loading = true
    if (this.search === '') {
      this.items = []
      return
    }

    let props = undefined
    if (this.props) {
      props = this.props
    }

    this.items = await this.resource.get({
      sort: { field: this.itemText, desc: false },
      props: props,
      searches: [{ field: this.itemText, query: this.search }]
    })

    this.loading = false
  }
}
</script>
