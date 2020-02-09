<template>
    <v-layout>
        <v-card hover :title="item.filename" light>
            <v-img :src="renderAsset(item.filepath)" :alt="item.filename" :title="item.filename" />
            <v-card-title primary-title>
                <div>
                    <h3 class="headline mb-0">{{item.filename}}</h3>
                    <div class="category"><i class="fa fa-tag"></i> {{ item.category }}</div>
                    <div class="filesize"><i class="fa fa-tag"></i> {{ (item.filesize/1024).toFixed(2) }} KB</div>
                </div>
            </v-card-title>
        </v-card>
    </v-layout>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import Media from "../../../_Common/Type/Media";

    @Component({
        components: {}
    })
    export default class Card extends Vue {
        @Prop() item: Media;
    }
</script>

<style lang="scss" scoped>
    @import "../../../../libs/theming/mixins";
    @import "../../../../scss/common/config";

    .v-card {
        margin: 5px;
        max-width: calc(100% - 10px);

        .v-card__title {
            padding: .5rem .3rem;

            & > div {
                max-width: 100%;
            }

            .headline {
                font-size: 1.2rem !important;
                line-height: 1.2 !important;
                margin: 0;
                padding: 0;
            }

            .category, .filesize {
                font-weight: $weightMedium;
                display: inline-block;
                font-size : 1rem;
                @include opacity(.6);

                .fa, .fas {
                    width: 23px;
                    text-align: center;
                }

                &:not(:last-child) {
                    margin-right: 15px;
                }
            }

            .headline, .category, .filesize {
                overflow: hidden;
                text-overflow: ellipsis;
                color: inherit;
                white-space: nowrap;
            }
        }
    }
</style>
