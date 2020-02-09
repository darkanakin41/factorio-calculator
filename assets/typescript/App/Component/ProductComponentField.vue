<template>
    <v-layout wrap>
        <v-flex xs6 md5 pa-2>
            <v-autocomplete label="Produit"
                            v-model="product"
                            :items="productStore.all"
                            item-text="name"
                            return-object />
        </v-flex>
        <v-flex xs6 md5 pa-2>
            <v-text-field v-model="quantity" label="Quantité" required />
        </v-flex>
        <v-flex xs12 md2 pa-2>
            <v-btn @click="addComponent()" primary :disabled="!isFormValid()">
                Ajouter
            </v-btn>
        </v-flex>
        <v-flex xs-12 pa-2>
            <v-simple-table>
                <thead>
                <tr>
                    <th class="text-left">Produit</th>
                    <th class="text-left">Quantité</th>
                    <th class="text-left">Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in componentsList" :key="item.id">
                    <td>{{ item.product.name }}</td>
                    <td>{{ item.quantity }}</td>
                    <td>
                        <v-btn v-on:click="removeComponent(item)" text rounded>
                            <i class="fa fa-trash" />
                        </v-btn>
                    </td>
                </tr>
                </tbody>
            </v-simple-table>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {productStore} from "../../_Common/Store";
    import {PRODUCT_TYPE} from "../../_Common/Nomenclature/ProductType";
    import {PRODUCT_UTILITY} from "../../_Common/Nomenclature/ProductUtility";
    import ProductComponent from "../../_Common/Type/ProductComponent";
    import Product from "../../_Common/Type/Product";

    @Component({
        components: {}
    })
    export default class ProductComponentField extends Vue {
        @Prop() components: Array<ProductComponent>;
        componentsList: Array<ProductComponent>;

        product: Product;
        quantity: number;

        data() {
            return {
                TYPES: PRODUCT_TYPE,
                UTILITIES: PRODUCT_UTILITY,
                productStore: productStore,
                componentsList: this.components,
                product: undefined,
                quantity: 1
            }
        }

        async mounted() {
            await productStore.getAll();
        }

        addComponent() {
            if (!this.isFormValid()) {
                return;
            }
            let exist = false;
            this.componentsList.forEach((item) => {
                if (item.product.id === this.product.id) {
                    exist = true;
                }
            });
            if (!exist) {
                this.componentsList.push({
                    id: null,
                    quantity: this.quantity,
                    product: this.product,
                });
            }
            this.product = undefined;
            this.quantity = 1;
            this.$emit('input:components', this.componentsList);
        }

        isFormValid() {
            return this.quantity !== undefined && this.product !== undefined;
        }

        removeComponent(toRemove: ProductComponent) {
            this.componentsList.forEach((item, index) => {
                if (item.product.id === toRemove.product.id) {
                    delete this.componentsList.splice(index,1);
                }
            });
            this.$emit('input:components', this.componentsList);
        }

    }
</script>

<style lang="scss" scoped>
</style>
