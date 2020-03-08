<template>
  <v-container fluid>
    <v-card>
      <v-sheet>
        <v-toolbar dark>
          <v-toolbar-title>
            {{ isCreate() ? 'Création d\'un objet' : 'Modification de l\'objet ' + item.name }}
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
            <v-flex xs12 md6 pa-2>
              <v-text-field v-model="item.name"
                            label="Nom"
                            :rules="required"
                            required/>
            </v-flex>

            <v-flex xs6 md6 pa-2>
              <api-autocomplete :resource="modResource"
                                label="Mod"
                                item-text="name"
                                :item.sync="item.mod"
              />
            </v-flex>
            <v-flex xs12 md6 pa-2>
              <v-select
                  v-model="item.type"
                  :items="ITEM_TYPE"
                  label="Type"
                  item-text="label"
                  item-value="value"
                  :rules="required"
                  required
              ></v-select>
            </v-flex>
            <v-flex xs12 md6 pa-2>
              <v-select
                  v-model="item.utility"
                  :items="ITEM_UTILITY"
                  label="Utilité"
                  item-text="label"
                  item-value="value"
                  :rules="required"
                  required
              ></v-select>
            </v-flex>
            <v-flex xs12 md12 pa-2 v-if="item.utility === 'transport' ">
              <v-text-field v-model.number="item.itemPerSecond"
                            type="number"
                            label="Objet par Seconde"
                            :rules="required"
                            required/>
            </v-flex>
            <v-flex xs12 md12 pa-2 v-if="item.utility === 'machine' ">
              <v-text-field v-model.number="item.craftingSpeed"
                            type="number"
                            label="Vitesse de Craft"
                            :rules="required"
                            required/>
            </v-flex>
            <v-flex xs12 md6 pa-2
                    v-if="['module-efficiency','module-speed', 'module-productivity'].indexOf(item.utility) !== -1">
              <v-text-field v-model.number="item.energyConsumption"
                            type="number"
                            label="Consommation Energetique"
                            :rules="required"
                            required/>
            </v-flex>
            <v-flex xs12 md6 pa-2 v-if="['module-speed', 'module-productivity'].indexOf(item.utility) !== -1">
              <v-text-field v-model.number="item.speed"
                            type="number"
                            label="Vitesse"
                            :rules="required"
                            required/>
            </v-flex>
            <v-flex xs12 md6 pa-2 v-if="['module-efficiency', 'module-productivity'].indexOf(item.utility) !== -1">
              <v-text-field v-model.number="item.polution"
                            type="number"
                            label="Polution"
                            :rules="required"
                            required/>
            </v-flex>
            <v-flex xs12 md6 pa-2 v-if="['module-productivity'].indexOf(item.utility) !== -1">
              <v-text-field v-model.number="item.productivity"
                            type="number"
                            label="Itemivité"
                            :rules="required"
                            required/>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="error" text @click="loadData()">Annuler</v-btn>
          <v-btn color="primary" depressed type="submit" @click="save()">Sauvegarder</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Inject, Prop, Vue } from 'vue-property-decorator'
import ItemResource from '../../../_Common/Resource/ItemResource'
import { snackbarModule } from '../../../_Common/Store'
import { SnackbarEntry } from '../../../_Darkanakin41/Store/SnackbarModule'
import RULES from '../../_config/rules'
import ApiAutocomplete from '../../Component/ApiAutocomplete.vue'
import ModResource from '../../../_Common/Resource/ModResource'
import Item, { newItem } from '../../../_Common/Model/Item'
import {ITEM_TYPE, ITEM_UTILITY} from '../../../_Common/Nomenclature'
import Nomenclature from '../../../_Darkanakin41/Nomenclature/type'

@Component({
  components: { ApiAutocomplete }
})
export default class ModPage extends Vue {
  @Inject('modResource')
  modResource: ModResource

  @Inject('itemResource')
  itemResource: ItemResource

  @Prop({ default: null })
  id?: string

  loading: Boolean = false

  ITEM_TYPE: Nomenclature[] = ITEM_TYPE
  ITEM_UTILITY: Nomenclature[] = ITEM_UTILITY

  item: Item | null = null

  required: {}[] = [
    RULES.required
  ]

  async created () {
    await this.loadData()
  }

  async loadData () {
    this.loading = true
    try {
      if (this.id === null) {
        this.item = newItem()
      } else {
        this.item = await this.itemResource.getOne(this.id)
      }
    } finally {
    }
    this.loading = false
  }

  isCreate () {
    return this.item === null || this.item.id === null
  }

  async save () {
    this.loading = true
    try {
      let snackback: SnackbarEntry = {
        color: 'success',
        icon: 'mdi-check'
      }

      if(this.item.mod === undefined){
        this.item.mod = null
      }
      if (this.item && this.item.id) {
        this.item = await this.itemResource.patch(this.item.id, this.item)
        snackback.title = 'La modification de l\'objet à bien été effectuée'
      } else if(this.item) {
        this.item = await this.itemResource.post(this.item)
        snackback.title = 'L\'ajout de l\'objet à bien été effectué'
        await this.$router.push({ name: 'item-edit', params: { id: this.item.id } })
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
