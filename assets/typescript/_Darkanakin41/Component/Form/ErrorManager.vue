<template>
    <div class="red pa-2" v-if="!isValid()">
        Le formulaire contient des erreurs :
        <ul>
            <li v-for="entry in errors.entries()">
                {{ entry[1] }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component({
        components: {}
    })
    export default class ErrorManager extends Vue {
        errors: Map<string, string>;

        data() {
            return {
                errors: new Map<string, string>(),
            }
        }

        addError(field, message) {
            this.errors.set(field, message);
        }

        resetErrors() {
            this.errors = new Map<string, string>();
        }

        isValid() {
            return this.errors.size === 0;
        }
    }
</script>

<style lang="scss" scoped>
</style>
