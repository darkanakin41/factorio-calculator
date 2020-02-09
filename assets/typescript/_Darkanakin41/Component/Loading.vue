<template>
    <div id="loading" v-bind:class="classes" v-if="displayed">
        <div class="spinner">
            <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from "vue-property-decorator";

    @Component
    export default class Loading extends Vue {
        @Prop({type: Boolean, default: true}) displayed;
        @Prop({type: Boolean, default: true}) fixed;
        @Prop({type: String, default: ''}) position;

        classes: Array<String> = [];

        data() {
            return {
                classes: [],
            }
        }

        mounted() {
            this.classes.push(this.position.trim() === '' ? 'fixed' : this.position.trim());
            if (this.displayed && this.classes.indexOf('active') === -1) {
                this.classes.push('active');
            }
        }

        @Watch('displayed')
        onDisplayedUpdated() {
            let index = this.classes.indexOf('active');
            if (this.displayed) {
                if (index === -1) {
                    this.classes.push('active');
                }
            } else {
                if (index !== -1) {
                    delete this.classes[index];
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../libs/theming/mixins";
    @import "../../../scss/common/config";

    #loading {
        display: flex;
        visibility: hidden;
        position: relative;
        color: white;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 3;
        justify-content: center;
        align-items: center;
        font-size: 10rem;
        @include opacity(0);

        &.fixed {
            position: fixed;
        }

        &.absolute {
            position: absolute;
        }

        &.relative {
            position: relative;
            min-height: 150px;
        }

        &.active {
            visibility: visible;
            @include opacity(1);
            @include transition(all 1s linear)
        }
    }
</style>
