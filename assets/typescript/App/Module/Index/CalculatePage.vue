<template>

    <v-container fluid>
        <v-card>
            <v-sheet>
                <v-toolbar dark>
                    <v-toolbar-title>
                        Calculatrice
                    </v-toolbar-title>
                </v-toolbar>

                <v-card-text>
                    <v-layout wrap>
                        <v-flex xs12 pa-2>
                            <h2 class="align-center">
                                Production de base
                            </h2>
                        </v-flex>
                        <v-flex xs12 pa-2>
                            <v-autocomplete
                                    v-model="product"
                                    :items="products"
                                    label="Produit"
                                    item-text="name"
                                    return-object
                            />
                        </v-flex>
                    </v-layout>
                    <v-layout wrap v-if="productCalculator !== undefined">
                        <v-flex xs12 md4 pa-2>
                            Avec une vitesse de fabrication de
                            <b>{{ numberRound(productCalculator.craftingSpeed(),4) }}</b> :
                        </v-flex>
                        <v-flex xs12 md4 pa-2>
                            Temps de fabrication :
                            <b>{{ numberRound(productCalculator.craftingTime(), 4) }} seconde(s)</b>
                        </v-flex>
                        <v-flex xs12 md4 pa-2>
                            Objet fabriqué par seconde :
                            <b>{{ numberRound(productCalculator.outputPerSecond(), 4) }}</b>
                        </v-flex>
                    </v-layout>
                    <v-divider v-if="productCalculator !== undefined" />
                    <v-layout wrap v-if="productCalculator !== undefined">
                        <v-flex xs12 pa-2>
                            <h2 class="align-center">
                                Production de base pour les machines
                            </h2>
                        </v-flex>
                        <v-flex xs12 md6 pa-2>
                            <v-autocomplete
                                    v-model="machine"
                                    :items="machines"
                                    label="Machine"
                                    item-text="name"
                                    return-object
                            />
                        </v-flex>
                        <v-flex xs12 md6 pa-2>
                            <v-autocomplete
                                    v-model="transport"
                                    :items="transports"
                                    label="Transport"
                                    item-text="name"
                                    return-object
                            />
                        </v-flex>
                    </v-layout>
                    <v-layout wrap v-if="machineCalculator !== undefined">
                        <v-flex xs12 md3 pa-2>
                            Avec une vitesse de fabrication de
                            <b>{{ numberRound(machineCalculator.craftingSpeed(),4) }}</b> :
                        </v-flex>
                        <v-flex xs12 md3 pa-2>
                            Temps de fabrication :
                            <b>{{ numberRound(machineCalculator.craftingTime(), 4) }} seconde(s)</b>
                        </v-flex>
                        <v-flex xs12 md3 pa-2>
                            Objet fabriqué par seconde :
                            <b>{{ numberRound(machineCalculator.outputPerSecond(), 4) }}</b>
                        </v-flex>
                        <v-flex xs12 md3 pa-2>
                            Transport nécessaire (sortie) :
                            <b>{{ numberRound(machineCalculator.outputTransportNeeded(), 4) }}</b>
                        </v-flex>
                        <v-flex xs12 pa-2>
                            <v-simple-table>
                                <thead>
                                <tr>
                                    <th class="text-left">Composant</th>
                                    <th class="text-center">Besoin par craft (base)</th>
                                    <th class="text-center">Entrée nécessaire par seconde</th>
                                    <th class="text-center">Transport nécessaire</th>
                                    <th class="text-center">Machine Supporté par Transport</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="item in product.components" :key="item.id">
                                    <td>{{ item.product.name }}</td>
                                    <td class="text-center">{{ item.quantity }}</td>
                                    <td class="text-center">{{ numberRound(machineCalculator.componentInputNeeded(item)) }}</td>
                                    <td class="text-center">{{ numberRound(machineCalculator.componentInputTransportNeeded(item)) }}</td>
                                    <td class="text-center">{{ numberRound(machineCalculator.componentInputTransportSupportedMachine(item)) }}</td>
                                </tr>
                                </tbody>
                            </v-simple-table>
                        </v-flex>
                    </v-layout>
                    <v-divider v-if="machineCalculator !== undefined" />
                    <v-layout wrap v-if="machineCalculator !== undefined">
                        <v-flex xs12 pa-2>
                            <h2 class="align-center">
                                Ajout de modules
                            </h2>
                        </v-flex>
                        <v-flex xs12 md2 pa-2>
                            <v-text-field v-model="nbSpeedModule" label="Nombre" />
                        </v-flex>
                        <v-flex xs12 md4 pa-2>
                            <v-autocomplete
                                    v-model="speedModule"
                                    :items="speedModules"
                                    label="Module de Vitesse"
                                    item-text="name"
                                    return-object
                            />
                        </v-flex>
                        <v-flex xs12 md2 pa-2>
                            <v-text-field v-model="nbProductivityModule" label="Nombre" />
                        </v-flex>
                        <v-flex xs12 md4 pa-2>
                            <v-autocomplete
                                    v-model="productivityModule"
                                    :items="productivityModules"
                                    label="Module de Productivité"
                                    item-text="name"
                                    return-object
                            />
                        </v-flex>
                    </v-layout>
                    <v-layout wrap v-if="moduleCalculator !== undefined">
                        <v-flex xs12 md6 pa-2>
                            Bonus de vitesse :
                            <b>{{ numberRound(numberToPercent(moduleCalculator.speedBonus()), 4) }}%</b>
                        </v-flex>
                        <v-flex xs12 md6 pa-2>
                            Bonus de productivité :
                            <b>{{ numberRound(numberToPercent(moduleCalculator.productivityBonus()), 4) }}%</b>
                        </v-flex>

                        <v-flex xs12 md3 pa-2>
                            Avec une vitesse de fabrication de
                            <b>{{ numberRound(moduleCalculator.craftingSpeed(),4) }}</b> :
                        </v-flex>
                        <v-flex xs12 md3 pa-2>
                            Temps de fabrication :
                            <b>{{ numberRound(moduleCalculator.craftingTime(), 4) }} seconde(s)</b>
                        </v-flex>
                        <v-flex xs12 md3 pa-2>
                            Objet fabriqué par seconde :
                            <b>{{ numberRound(moduleCalculator.outputPerSecond(), 4) }}</b>
                        </v-flex>
                        <v-flex xs12 md3 pa-2>
                            Transport nécessaire (sortie) :
                            <b>{{ numberRound(moduleCalculator.outputTransportNeeded(), 4) }}</b>
                        </v-flex>
                        <v-flex xs12 pa-2>
                            <v-simple-table>
                                <thead>
                                <tr>
                                    <th class="text-left">Composant</th>
                                    <th class="text-center">Besoin par craft (base)</th>
                                    <th class="text-center">Entrée nécessaire par seconde</th>
                                    <th class="text-center">Transport nécessaire</th>
                                    <th class="text-center">Machine Supporté par Transport</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="item in product.components" :key="item.id">
                                    <td>{{ item.product.name }}</td>
                                    <td class="text-center">{{ item.quantity }}</td>
                                    <td class="text-center">{{ numberRound(moduleCalculator.componentInputNeeded(item)) }}</td>
                                    <td class="text-center">{{ numberRound(moduleCalculator.componentInputTransportNeeded(item)) }}</td>
                                    <td class="text-center">{{ numberRound(moduleCalculator.componentInputTransportSupportedMachine(item)) }}</td>
                                </tr>
                                </tbody>
                            </v-simple-table>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-sheet>
        </v-card>
    </v-container>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from "vue-property-decorator";
    import {productStore} from "../../../_Common/Store";
    import Product from "../../../_Common/Type/Product";
    import ProductComponent from "../../../_Common/Type/ProductComponent";
    import CraftingComponentCalculator from "../../Component/Calculator/CraftingComponentCalculator";

    @Component({
        components: {}
    })
    export default class HomePage extends Vue {
        product: Product | undefined;
        products: Array<Product>;

        transport: Product | undefined;
        transports: Array<Product>;

        machine: Product | undefined;
        machines: Array<Product>;

        speedModule: Product | undefined;
        nbSpeedModule: number;
        speedModules: Array<Product>;

        productivityModule: Product | undefined;
        nbProductivityModule: number;
        productivityModules: Array<Product>;

        productCalculator: CraftingComponentCalculator;
        machineCalculator: CraftingComponentCalculator;
        moduleCalculator: CraftingComponentCalculator;

        data() {
            return {
                productStore: productStore,
                product: undefined,
                products: undefined,
                transport: undefined,
                transports: undefined,
                machine: undefined,
                machines: undefined,

                speedModule: undefined,
                nbSpeedModule: 0,
                speedModules: undefined,

                productivityModule: undefined,
                nbProductivityModule: 0,
                productivityModules: undefined,

                productCalculator: undefined,
                machineCalculator: undefined,
                moduleCalculator: undefined,
            }
        }

        async mounted() {
            await productStore.getAll();
            this.products = productStore.all;

            await productStore.getAll({filters: {utility: 'transport'}});
            this.transports = productStore.all;

            await productStore.getAll({filters: {utility: 'machine'}});
            this.machines = productStore.all;

            await productStore.getAll({filters: {utility: 'module-speed'}});
            this.speedModules = productStore.all;

            await productStore.getAll({filters: {utility: 'module-productivity'}});
            this.productivityModules = productStore.all;
        }

        @Watch('product')
        onProductUpdate() {
            let calculator = undefined;
            if (this.product !== undefined) {
                calculator = new CraftingComponentCalculator(this.product, {craftingSpeed: 1});
            }
            this.productCalculator = calculator;
            this.onMachineOrTransportUpdate();
        }

        @Watch('machine')
        @Watch('transport')
        onMachineOrTransportUpdate() {
            let calculator = undefined;
            if (this.machine !== undefined && this.transport !== undefined) {
                calculator = new CraftingComponentCalculator(this.product, this.machine);
                calculator.setTransport(this.transport);
            }
            this.machineCalculator = calculator;
            this.onModuleUpdate();
        }

        @Watch('speedModule')
        @Watch('nbSpeedModule')
        @Watch('productivityModule')
        @Watch('nbProductivityModule')
        onModuleUpdate() {
            let calculator = undefined;
            if (this.speedModule !== undefined || this.productivityModule !== undefined) {
                calculator = new CraftingComponentCalculator(this.product, this.machine);
                calculator.setTransport(this.transport);
                calculator.setSpeedModule(this.speedModule, this.nbSpeedModule);
                calculator.setProductivityModule(this.productivityModule, this.nbProductivityModule);
            }
            this.moduleCalculator = calculator;
        }

    }
</script>

<style lang="scss" scoped>
    .v-divider {
        margin: 25px 0;
    }
</style>
