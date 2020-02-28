<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title><slot name="title">Validation</slot></v-card-title>
      <v-card-text>
        <slot>Êtes-vous sûr de vouloir faire cela ?</slot>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="error" text @click="dialog = false">Non</v-btn>
        <v-btn color="primary" depressed @click="confirm">Oui</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class ValidationDialog extends Vue {
  @Prop({ type: Boolean, default: false })
  value: boolean
  @Prop({ type: Function, default: () => {} })
  confirmCb: Function
  dialog: boolean = false

  confirm () {
    this.confirmCb()
    this.dialog = false
  }

  @Watch('value')
  @Watch('dialog')
  onValueChanged (newVal: boolean) {
    this.dialog = newVal
    this.$emit('input', newVal)
  }
}
</script>
