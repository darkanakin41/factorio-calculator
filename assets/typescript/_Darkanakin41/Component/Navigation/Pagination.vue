<template>
    <v-layout wrap v-if="lastPage > 0">
        <div class="flex xs12 md4 text-xs-center text-md-left">
            Il y a {{ this.itemsInput.length }} éléments
        </div>
        <div class="flex xs12 md8 text-xs-center text-md-right">
            <v-pagination v-model="currentPage" :length="lastPage"></v-pagination>
        </div>
    </v-layout>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from "vue-property-decorator";

    @Component
    export default class Pagination extends Vue {
        @Prop({type: Array}) itemsInput;
        @Prop({type: Number, default: 10}) nbPerPage;

        currentPage: Number = 1;
        lastPage: Number = null;

        mounted() {
            this.currentPage = 1;
            this.onItemsInputUpdate();
            this.onCurrentPageUpdate();
        }

        /**
         * Calcul the maximum number of page to display
         */
        @Watch("itemsInput")
        onItemsInputUpdate() {
            if (this.itemsInput.length <= this.nbPerPage) {
                this.lastPage = 0;
            } else {
                this.lastPage = Math.trunc(this.itemsInput.length / this.nbPerPage);
                if ((this.itemsInput.length % this.nbPerPage) > 0) {
                    this.lastPage++;
                }
            }
            this.currentPage = 1;
            this.onCurrentPageUpdate();
        }

        /**
         * Calcul of item list to display
         */
        @Watch("currentPage")
        onCurrentPageUpdate() {
            let start = (this.currentPage - 1) * this.nbPerPage;
            let end = start + this.nbPerPage;
            this.$emit('input', this.itemsInput.slice(start, end));
        }

    }
</script>

<style lang="scss" scoped>
    .layout {
        align-items: center;
    }
</style>
