import {Store} from 'vuex'
import {getModule} from 'vuex-module-decorators'
import ProductStore from "./ProductStore";

export let productStore: ProductStore;

export const modules = {
    'product': ProductStore,
};

export function initializeStores(store: Store<any>): void {
    productStore = getModule(ProductStore, store);
}
