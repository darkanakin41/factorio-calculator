<template>
    <v-container fluid>
        <v-card>
            <v-sheet>
                <v-toolbar dark>
                    <form v-on:submit.prevent="getData()">
                        <v-text-field v-model="search"
                                      append-icon="search"
                                      label="Rechercher"
                                      single-line
                                      hide-details
                        />
                    </form>
                    <v-spacer />
                    <v-toolbar-items>
                        <v-btn @click="openCreate()">Créer</v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-data-table :headers="headers" :items="productStore.items" :server-items-length="total" :options.sync="pagination" :loading="productStore.isLoading" :footer-props="footerProps">
                    <template v-slot:item.type="{ item }">
                        {{ getNomenclatureLabel(PRODUCT_TYPE, item.type) }}
                    </template>
                    <template v-slot:item.utility="{ item }">
                        {{ getNomenclatureLabel(PRODUCT_UTILITY, item.utility) }}
                    </template>
                    <template v-slot:item.components="{ item }">
                        {{ item.components.length }}
                    </template>
                    <template v-slot:item.craftingTime="{ item }">
                        {{ item.craftingTime }} s
                    </template>
                    <template v-slot:item.detail="{ item }">
                        <v-btn @click="openEdit(item)" text rounded>
                            <i class="fa fa-edit" />
                        </v-btn>
                    </template>
                </v-data-table>
            </v-sheet>
        </v-card>
        <ProductForm :selected.sync="selected" :open.sync="dialog" />
    </v-container>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from "vue-property-decorator";
    import Loading from "../../../_Darkanakin41/Component/Loading.vue";
    import ErrorManager from "../../../_Darkanakin41/Component/Form/ErrorManager.vue";
    import Product, {newProduct} from "../../../_Common/Type/Product";
    import tableConfig from "../../_config/table/product";
    import {productStore} from "../../../_Common/Store";
    import {PRODUCT_TYPE} from "../../../_Common/Nomenclature/ProductType";
    import {PRODUCT_UTILITY} from "../../../_Common/Nomenclature/ProductUtility";
    import ProductForm from "../../Component/ProductForm.vue";

    @Component({
        components: {ProductForm, Loading, ErrorManager}
    })
    export default class IndexPage extends Vue {
        headers: Array<any> = [];
        pagination;
        search: string;
        total: number;
        loading: Boolean;
        selected?: Product;
        items: Array<Product>;
        dialog: boolean;

        data() {
            return {
                headers: tableConfig.headers,
                pagination: tableConfig.pagination,
                footerProps: tableConfig.footerProps,
                search: '',
                total: 0,
                items: [],
                productStore: productStore,
                PRODUCT_TYPE: PRODUCT_TYPE,
                PRODUCT_UTILITY: PRODUCT_UTILITY,
                dialog: false,
                selected: undefined,
            }
        }

        async getData() {
            await productStore.getPaginated({...this.pagination, ...{search: this.search}});
            this.total = productStore.total;
        }

        openCreate() {
            this.selected = newProduct();
            this.dialog = true;
        }

        openEdit(item: Product) {
            this.selected = item;
            this.dialog = true;
        }

        @Watch('pagination', {deep: true})
        onPaginationUpdate(){
            this.getData();
        }

        @Watch('selected')
        onSelectedUpdate(newSelected, oldSelected) {
            if (newSelected === undefined && oldSelected !== undefined) {
                this.getData();
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
