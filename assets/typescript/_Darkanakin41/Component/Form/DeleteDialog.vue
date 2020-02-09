<template>
    <v-dialog v-model="open" width="500">
        <v-card>
            <v-card-title class="headline red" primary-title>
                Suppression de {{ title }}
            </v-card-title>

            <v-card-text>
                <p>
                    Vous êtes sur le point de supprimer <b>{{ title }}</b>
                    <br />
                    Cette action supprimera toutes les informations qui lui sont liés et il ne sera pas possible de faire machine arrière.
                </p>
                <p>
                    Êtes-vous sûre de vouloir le supprimer ?
                </p>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="success" @click="confirm()">
                    Oui j'en suis sûre!
                </v-btn>
                <v-btn color="error" @click="close()">
                    Euh ... en fait non!
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component({
        components: {}
    })
    export default class DeleteDialog extends Vue {
        @Prop()
        title: string;
        @Prop()
        open: boolean;
        @Prop()
        callback: Function;

        data() {
            return {}
        }

        close() {
            this.$emit('input', false);
        }

        confirm() {
            this.callback();
            this.close();
        }

    }
</script>

<style lang="scss" scoped>
</style>
