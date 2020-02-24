import { Module, Mutation, VuexModule } from 'vuex-module-decorators'

export interface SnackbarButton {
  text?: string,
  icon?: string,
  action?: () => any
}

export interface SnackbarEntry {
  message?: string
  info?: string
  icon?: string
  title?: string
  color?: string
  multiLine?: boolean
  timeout?: number
  closable?: boolean
  button?: SnackbarButton
}

export interface SnackbarState {
  entry?: SnackbarEntry | null
}

@Module({
  name: 'snackbar',
  namespaced: true,
  stateFactory: true
})
export default class SnackbarModule extends VuexModule implements SnackbarState {
  entry?: SnackbarEntry | null = null

  @Mutation
  setSnackbarEntry (payload: SnackbarEntry | null) {
    if (payload && payload.closable === undefined) {
      payload.closable = true
    }
    this.entry = payload
  }

  @Mutation
  clearSnackbarEntry () {
    this.entry = undefined
  }

  get currentSnackbarEntry (): SnackbarEntry | null | undefined {
    return this.entry
  }
}
