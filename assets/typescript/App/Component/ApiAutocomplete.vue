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
import { Component, Model, Prop, Vue, Watch } from 'vue-property-decorator'
import AbstractApiResource from '../../_Darkanakin41/ApiPlatform/Resource/AbstractApiResource'

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
      this.item = await this.resource.getOne(id)
    } else {
      this.item = this.selected
    }
    this.loading = false
  }

  updateValue($event){
    this.$emit('update:item', $event)
  }


  @Watch('search')
  async loadProducts () {
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
