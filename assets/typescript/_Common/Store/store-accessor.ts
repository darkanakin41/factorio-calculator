import {Store} from 'vuex'
import {getModule} from 'vuex-module-decorators'
import SnackbarModule from '../../_Darkanakin41/Store/SnackbarModule'

export let snackbarModule: SnackbarModule;

export const modules = {
    'snackbar': SnackbarModule
};

export function initializeStores(store: Store<any>): void {
    snackbarModule = getModule(SnackbarModule, store);
}
