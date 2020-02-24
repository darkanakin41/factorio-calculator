import _AbstractType from "../../_Darkanakin41/Type/_AbstractType";

export default class LocalStorageManager<T extends _AbstractType> {

    private readonly storeName: string;

    constructor(storeName: string) {
        this.storeName = storeName
    }


    getAll(payload: any = {}): any {
        let storeContent = localStorage.getItem(this.storeName);
        if (storeContent === null) {
            return {items: [], total: 0};
        }
        let data: Array<T> = JSON.parse(storeContent);

        data = this.applyFilters(data, payload);
        data = this.applySearch(data, payload);

        let total = data.length;

        data = this.applySort(data, payload);

        return {items: data, total: total};
    }


    getPaginated(payload: any = {}): any {
        let flux = this.getAll(payload);

        let data = this.applyPagination(flux.items, payload);

        console.log(data);
        return {items: data, total: flux.total};
    }

    retrieve(payload: any): T | undefined {
        return this.getAll().find((item: T) => {
            return item.id === payload.id
        });
    }

    save(payload: T): T {
        let data = this.getAll().items;

        if (payload.id === null) {
            let id: number = 0;
            if (data.length > 0) {
                id = (data[data.length - 1].id ?? 0) + 1;
            }
            payload.id = id;
            data.push(payload);
        } else {
            let index = data.findIndex((item: T) => {
                return item.id === payload.id
            });
            data[index] = payload;
        }

        localStorage.setItem(this.storeName, JSON.stringify(data));

        return payload;
    }

    delete(payload: T) {
        let data = this.getAll().items;

        let index = data.findIndex((item: T) => {
            return item.id === payload.id
        });

        if (index !== -1) {
            delete data[index];
        }
    }

    private applyFilters(data: Array<T>, payload: any = {}){
        let filters:any = undefined;
        if(payload.hasOwnProperty('filters')){
            filters = payload.filters;
        }

        if(filters !== undefined){
            return data.filter((item) => {
                let valid = true;
                Object.keys(filters).forEach((key:any) => {
                    // @ts-ignore
                    let itemValue:any = item[key];
                    let filterValue = filters[key];

                    if(itemValue !== filterValue){
                        valid = false;
                    }
                });
                return valid;
            });
        }

        return data;
    }
    /**
     * Apply pagination to the input data
     * @param {Array<T>} data
     * @param {object} payload
     */
    private applyPagination(data: Array<T>, payload: any = {}) {
        let page = undefined;
        let itemsPerPage = undefined;
        if (payload.hasOwnProperty('page')) {
            page = payload.page;
        }
        if (payload.hasOwnProperty('itemsPerPage')) {
            itemsPerPage = payload.itemsPerPage;
        }

        if (page !== undefined && itemsPerPage !== undefined) {
            let start = (page - 1) * itemsPerPage;
            return data.splice(start, itemsPerPage);
        }
        return data;
    }

    /**
     * Apply search to the input data
     * @param {Array<T>} data
     * @param {object} payload
     */
    private applySearch(data: Array<T>, payload: any = {}) {
        if(payload.hasOwnProperty('search') && payload.search.trim() !== ''){
            let toSearch = payload.search;
            return data.filter((a:T) => {
                let match = false;
                Object.keys(a).forEach((key) => {
                    // @ts-ignore
                    let value = a[key];
                    if(typeof value === 'object'){
                        return;
                    }
                    if(['string'].indexOf(typeof value) === -1){
                        value = JSON.stringify(value);
                    }
                    if(!match || value !== undefined){
                        if(value.toLowerCase().indexOf(toSearch.toLowerCase()) !== -1){
                            match = true;
                        }
                    }
                });
                return match;
            })
        }
        return data;
    }

    /**
     * Apply sort to the input data
     * @param {Array<T>} data
     * @param {object} payload
     */
    private applySort(data: Array<T>, payload: any = {}) {
        let sortBy: string | undefined = undefined;
        let sortDesc: number | undefined = undefined;
        if (payload.hasOwnProperty('sortBy')) {
            sortBy = payload.sortBy[0];
        }
        if (payload.hasOwnProperty('sortDesc')) {
            sortDesc = payload.sortDesc[0] ? -1 : 1;
        }
        if (sortBy !== undefined && sortDesc !== undefined) {
            return data.sort((a: T, b: T) => {
                // @ts-ignore
                let aValue:string = a[sortBy];
                // @ts-ignore
                let bValue:string = b[sortBy];

                // @ts-ignore
                return aValue.localeCompare(bValue) * sortDesc;
            });
        }

        return data;
    }
}
