import _AbstractStore from "../../_Darkanakin41/Store/_AbstractStore";
import {Action, Module} from "vuex-module-decorators";
import Product from "../Type/Product";
import LocalStorageManager from "../Tool/LocalStorageManager";


@Module({
    name: 'product',
    namespaced: true,
    stateFactory: true
})
export default class ProductStore extends _AbstractStore<Product> {

    static localStore: LocalStorageManager<Product>;

    static getLocalStore(): LocalStorageManager<Product> {
        if (ProductStore.localStore === undefined) {
            ProductStore.localStore = new LocalStorageManager<Product>('product');
        }
        return ProductStore.localStore;
    }

    @Action
    async getAll(payload: any = {}): Promise<any> {
        try {
            this.setLoading();
            this.setAll(ProductStore.getLocalStore().getAll(payload));
        } catch (err) {
            this.setError(err)
        }
    }

    @Action
    async getPaginated(payload: any): Promise<any> {
        try {
            this.setLoading();
            this.setDataMultiple(ProductStore.getLocalStore().getPaginated(payload));
        } catch (err) {
            this.setError(err)
        }
    }

    @Action
    async retrieve(payload: any): Promise<any> {
        try {
            this.setLoading();
            this.setDataSimple({data: ProductStore.getLocalStore().retrieve(payload)});
        } catch (err) {
            this.setError(err)
        }
    }

    @Action
    async save(payload: Product): Promise<any> {
        try {
            this.setLoading();
            let item = ProductStore.getLocalStore().save(payload);
            await this.setDataSimple({data: item});
        } catch (err) {
            this.setError(err)
        }
    }

    @Action
    async delete(payload: Product): Promise<any> {
        try {
            this.setLoading();
            ProductStore.getLocalStore().delete(payload);
            this.setDeleted();
        } catch (err) {
            this.setError(err)
        }
    }
}
