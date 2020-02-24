import {Store} from 'vuex'
import {getModule} from 'vuex-module-decorators'
import ProductStore from "./ProductStore";
import SnackbarModule from '../../_Darkanakin41/Store/SnackbarModule'

export let productStore: ProductStore;
export let snackbarModule: SnackbarModule;

export const modules = {
    'product': ProductStore,
    'snackbar': SnackbarModule
};

export function initializeStores(store: Store<any>): void {
    productStore = getModule(ProductStore, store);
    snackbarModule = getModule(SnackbarModule, store);
}
