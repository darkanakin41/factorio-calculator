<template>
  <v-snackbar class="snackbar-global" :multi-line="!!currentSnackbarEntry.title && !!currentSnackbarEntry.message"
              v-if="currentSnackbarEntry"
              v-bind="currentSnackbarEntry" v-model="snackbarDisplayed">
    <v-row no-gutters>
      <v-col cols="auto" v-if="currentSnackbarEntry.icon" class="pr-2">
        <v-icon class="vertical-center">{{ currentSnackbarEntry.icon }}</v-icon>
      </v-col>
      <v-col class="white--text">
        <v-row no-gutters>
          <v-col cols="12" v-if="currentSnackbarEntry.title">
            <h4>{{ currentSnackbarEntry.title }}</h4>
          </v-col>
          <v-col cols="12" v-if="currentSnackbarEntry.message" v-html="currentSnackbarEntry.message">
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="auto" class="pl-3" v-if="currentSnackbarEntry.button">
        <v-btn dark text @click="currentSnackbarEntry.button.action()" class="vertical-center">
          <v-icon v-if="currentSnackbarEntry.button.icon">{{ currentSnackbarEntry.button.icon }}</v-icon>
          {{ currentSnackbarEntry.button.text }}
        </v-btn>
      </v-col>
      <v-col cols="auto" class="pl-2" v-if="currentSnackbarEntry.closable">
        <v-btn dark text @click.native="snackbarDisplayed = false" class="vertical-center close-button">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-snackbar>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { snackbarModule } from '../../_Common/Store'
import { SnackbarEntry } from '../Store/SnackbarModule'

@Component
export default class Snackbar extends Vue {
  snackbarDisplayed: boolean = false

  get currentSnackbarEntry (): SnackbarEntry | null | undefined {
    return snackbarModule.currentSnackbarEntry
  }

  @Watch('currentSnackbarEntry')
  onSnackbarEntryChange (entry?: SnackbarEntry | null) {
    this.snackbarDisplayed = !!entry
  }
}
</script>

<style lang="scss" scoped>
.snackbar-global::v-deep {
  .v-snack__wrapper {
    max-width: initial !important;
  }

  .snack__content {
    height: initial !important;

    .btn {
      margin-left: 0 !important;
    }
  }

  .close-button {
    .v-icon {
      margin: 0;
    }
  }

  .col {
    align-self: center;
  }
}
</style>
