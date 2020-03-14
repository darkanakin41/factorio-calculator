import {Store} from 'vuex'
import {getModule} from 'vuex-module-decorators'
import SnackbarModule from '../../_Darkanakin41/Store/SnackbarModule'
import AuthModule from "./AuthModule";

export let snackbarModule: SnackbarModule;
export let authModule: AuthModule;

export const modules = {
    'snackbar': SnackbarModule,
    'auth': AuthModule
};

export function initializeStores(store: Store<any>): void {
    snackbarModule = getModule(SnackbarModule, store);
    authModule = getModule(AuthModule, store);
}
