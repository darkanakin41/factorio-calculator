<template>
  <v-container fluid>
    <v-card>
      <v-sheet>
        <v-toolbar dark>
          <v-toolbar-title>
            {{ isCreate() ? 'Création d\'un mod' : 'Modification du mod ' + mod.name }}
          </v-toolbar-title>
        </v-toolbar>
      </v-sheet>
      <v-card-text v-if="loading">
        <v-row no-gutters justify="center">
          <v-progress-circular color="primary" size="50" indeterminate/>
        </v-row>
      </v-card-text>
      <v-form v-else>
        <v-card-text>
          <v-layout wrap>
            <v-flex xs12 md12 pa-2>
              <v-text-field v-model="mod.name"
                            label="Nom"
                            :rules="required"
                            required/>
            </v-flex>
            <v-flex xs12 md12 pa-2>
              <v-text-field v-model="mod.websiteUrl"
                            label="Official Website"
              />
            </v-flex>
            <v-flex xs12 md12 pa-2>
              <v-text-field v-model="mod.sourceUrl"
                            label="Source Link"
              />
            </v-flex>
            <v-flex xs12 md12 pa-2>
              <tinymce-editor ref="editor"
                              :api-key="TINYMCE_API_KEY"
                              @onChange="onEditorChange"
                              :init="editorConfig"
                              :initial-value="mod.description"/>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="error" text @click="loadData()">Annuler</v-btn>
          <v-btn color="primary" depressed type="submit" @click="save()">Sauvegarder</v-btn>
        </v-card-actions>
        <v-divider v-if="!isCreate()"/>
        <v-card-text v-if="!isCreate()">
          <product-table :api-searches="apiSearches" :headers="headers"/>
        </v-card-text>
      </v-form>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Inject, Prop, Vue } from 'vue-property-decorator'
import ProductResource from '../../../_Common/Resource/ProductResource'
import { snackbarModule } from '../../../_Common/Store'
import { SnackbarEntry } from '../../../_Darkanakin41/Store/SnackbarModule'
import RULES from '../../_config/rules'
import ProductComponentField from '../../Component/ProductComponentField.vue'
import ApiAutocomplete from '../../Component/ApiAutocomplete.vue'
import ModResource from '../../../_Common/Resource/ModResource'
import Mod, { newMod } from '../../../_Common/Model/Mod'
import { TINYMCE_API_KEY } from '../../_config/configuration'
import ProductTable from '../../Component/ProductTable.vue'
import { DataTableHeader } from 'vuetify'
import ApiSearch from '../../../_Darkanakin41/ApiPlatform/Model/ApiSearch'

@Component({
  components: { ProductTable, ApiAutocomplete, ProductComponentField }
})
export default class ModPage extends Vue {
  @Inject('modResource')
  modResource: ModResource

  @Inject('productResource')
  productResource: ProductResource

  @Prop({ default: null })
  id?: string

  TINYMCE_API_KEY = TINYMCE_API_KEY

  loading: Boolean = false

  mod: Mod | null = null

  editorConfig: {} = {
    plugins: [
      'advlist autolink charmap code image imagetools',
      'link lists pagebreak table textpattern wordcount'
    ],
    toolbar1: 'bold italic underline | styleselect | forecolor backcolor | alignleft aligncenter alignright | bullist numlist outdent indent code',
    toolbar2: 'link | code',
    contextmenu: 'cut copy paste pastetext | link image inserttable',

    height: 450,
    image_advtab: true,
    relative_urls: false,
    menubar: false,
    image_caption: true,
    extended_valid_elements: 'span[*]'
  }

  required: {}[] = [
    RULES.required
  ]

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

  get apiSearches (): ApiSearch[] | undefined {
    const search: ApiSearch [] = []
    if (!this.isCreate()) {
      search.push(
        { field: 'mod.id', query: this.id ? this.id : '' }
      )
    }
    return search
  }

  async created () {
    await this.loadData()
  }

  async loadData () {
    this.loading = true
    try {
      if (this.id === null) {
        this.mod = newMod()
      } else {
        this.mod = await this.modResource.getOne(this.id)
      }
    } finally {
    }
    this.loading = false
  }

  isCreate () {
    return this.mod === null || this.mod.id === null
  }

  onEditorChange (editor) {
    this.mod?.description = editor.level.content
  }

  async save () {
    this.loading = true
    try {
      let snackback: SnackbarEntry = {
        color: 'success',
        icon: 'mdi-check'
      }

      if (this.mod.id) {
        this.mod = await this.modResource.patch(this.mod.id, this.mod)
        snackback.title = 'La modification du produit à bien été effectuée'
      } else {
        this.mod = await this.modResource.post(this.mod)
        snackback.title = 'L\'ajout du produit à bien été effectué'
        await this.$router.push({ name: 'mod-edit', params: { id: this.mod.id } })
      }
      snackbarModule.setSnackbarEntry(snackback)
    } catch (error) {
      snackbarModule.setSnackbarEntry({
        icon: 'mdi-alert-circle-outline',
        message: error.response.data['hydra:description'],
        color: 'error'
      })
    }
    this.loading = false
  }

}
</script>

<style lang="scss" scoped>
</style>
