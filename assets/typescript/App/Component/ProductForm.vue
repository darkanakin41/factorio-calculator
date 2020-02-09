<template>
    <v-dialog v-model="open" persistent>
        <v-card>
            <v-card-title class="headline green" primary-title>
                {{ isCreate() ? "Création d'un produit" : "Modification du produit " + selected.name }}
            </v-card-title>

            <v-form @submit="saveProduct()" v-if="selected !== undefined">
                <v-card-text>
                    <v-layout wrap>
                        <v-flex xs12 pa-2>
                            <v-text-field v-model="selected.name" label="Nom" required />
                        </v-flex>
                        <v-flex xs12 md6 pa-2>
                            <v-text-field v-model="selected.output" label="Item par craft" required />
                        </v-flex>
                        <v-flex xs12 md6 pa-2>
                            <v-text-field v-model="selected.craftingTime" label="Temps de craft" required />
                        </v-flex>
                        <v-flex xs12 md6 pa-2>
                            <v-select
                                    v-model="selected.type"
                                    :items="TYPES"
                                    label="Type"
                                    item-text="label"
                                    item-value="value"
                            ></v-select>
                        </v-flex>
                        <v-flex xs12 md6 pa-2>
                            <v-select
                                    v-model="selected.utility"
                                    :items="UTILITIES"
                                    label="Utilité"
                                    item-text="label"
                                    item-value="value"
                            ></v-select>
                        </v-flex>
                        <v-flex xs12 md12 pa-2 v-if="selected.utility === 'transport' ">
                            <v-text-field v-model="selected.itemPerSecond" label="Objet par Seconde" required />
                        </v-flex>
                        <v-flex xs12 md12 pa-2 v-if="selected.utility === 'machine' ">
                            <v-text-field v-model="selected.craftingSpeed" label="Vitesse de Craft" required />
                        </v-flex>
                        <v-flex xs12 md6 pa-2 v-if="['module-efficiency','module-speed', 'module-productivity'].indexOf(selected.utility) !== -1">
                            <v-text-field v-model="selected.energyConsumption" label="Consommation Energetique" required />
                        </v-flex>
                        <v-flex xs12 md6 pa-2 v-if="['module-speed', 'module-productivity'].indexOf(selected.utility) !== -1">
                            <v-text-field v-model="selected.speed" label="Vitesse" required />
                        </v-flex>
                        <v-flex xs12 md6 pa-2 v-if="['module-efficiency', 'module-productivity'].indexOf(selected.utility) !== -1">
                            <v-text-field v-model="selected.polution" label="Polution" required />
                        </v-flex>
                        <v-flex xs12 md6 pa-2 v-if="['module-productivity'].indexOf(selected.utility) !== -1">
                            <v-text-field v-model="selected.productivity" label="Productivité" required />
                        </v-flex>
                        <v-flex xs12 pa-2>
                            <ProductComponentField :components.sync="selected.components" />
                        </v-flex>
                    </v-layout>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="warning" text @click="close()">
                        Annuler
                    </v-btn>
                    <v-btn color="success" text @click="saveProduct()">
                        {{ isCreate() ? "Créer" : "Mettre à jour" }}
                    </v-btn>
                    <v-btn color="danger" text @click="removeProduct()" v-if="!isCreate()">
                        Supprimer
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import Product from "../../_Common/Type/Product";
    import {productStore} from "../../_Common/Store";
    import {PRODUCT_TYPE} from "../../_Common/Nomenclature/ProductType";
    import {PRODUCT_UTILITY} from "../../_Common/Nomenclature/ProductUtility";
    import ProductComponentField from "./ProductComponentField.vue";

    @Component({
        components: {ProductComponentField}
    })
    export default class ProductForm extends Vue {
        @Prop({default: false}) open: boolean;
        @Prop() selected: Product | undefined;

        data() {
            return {
                TYPES: PRODUCT_TYPE,
                UTILITIES: PRODUCT_UTILITY,
                productStore: productStore,
            }
        }

        async saveProduct() {
            await productStore.save(this.selected);
            this.close();
        }

        async removeProduct() {
            await productStore.delete(this.selected);
            this.close();
        }

        close() {
            this.$emit('update:open', false);
            this.$emit('update:selected', undefined);
        }

        async mounted() {
            await productStore.getAll();
        }

        isCreate() {
            return this.selected === undefined || this.selected.id === null;
        }

    }
</script>

<style lang="scss" scoped>
</style>
