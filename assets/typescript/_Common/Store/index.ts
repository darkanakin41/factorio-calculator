import Vue from 'vue';
import Vuex, {Store} from 'vuex';
import { initializeStores, modules } from './store-accessor'

Vue.use(Vuex);

const initializer = (store: Store<any>) => initializeStores(store);
export const plugins = [initializer];
export * from './store-accessor' // re-export the modules

export default new Store({
    plugins, // important!
    modules, // important!
    state: { root: 'I am groot' },
    mutations: {},
    actions: {}
});

