import {Module, Mutation, VuexModule} from 'vuex-module-decorators';
import _AbstractType from "../Type/_AbstractType";

@Module
export default abstract class _AbstractStore<T extends _AbstractType> extends VuexModule {

    static state() {
        return {
            items: [],
            all: [],
            item: null,
            error: null,
            loading: 0,
            total: 0,
        }
    }

    items: Array<T> = [];
    all: Array<T> = [];
    item: T | null = null;
    error: Error | null = null;
    loading: number = 0;
    total: number = 0;

    @Mutation
    setDeleted() {
        this.item = null;
        this.loading--;
    }

    @Mutation
    setLoading() {
        this.loading++;
        this.item = null;
        this.error = null;
        this.total = 0;
    }

    @Mutation
    setError(error: Error) {
        this.error = error;
        this.loading--;
    }

    @Mutation
    setAll(payload: any) {
        this.all = payload.items;
        this.loading--;
    }

    @Mutation
    setDataMultiple(payload: any) {
        this.items = payload.items;
        this.total = payload.total;
        this.loading--;
    }

    @Mutation
    setDataSimple(payload: any) {
        this.item = payload;
        this.loading--;
    }

    abstract async getAll(payload?: any): Promise<any>;

    abstract async getPaginated(payload: any): Promise<any>;

    abstract async retrieve(payload: any): Promise<any>;

    abstract async save(payload: T): Promise<any>;

    abstract async delete(payload: T): Promise<any>;

    get isLoading() {
        return this.loading > 0;
    }
}
