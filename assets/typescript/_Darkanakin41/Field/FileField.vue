<template>
    <div class="text-center">
        <div class="ma-2">
            <v-btn @click="openModal()">Choisir une image pour {{ label }}</v-btn>
            <v-btn v-if="canDelete && this.selected !== null" @click="removeImage()">Déselectionner l'image</v-btn>
        </div>
        <v-img v-if="file !== null && file !== undefined" :src="'/' + file.filepath" color="red"></v-img>
        <FileModal ref="fileModal" :title="'Choisir une image pour ' + label" :category="category" :dialog="open" :onClick="selectFile" />
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from "vue-property-decorator";
    import Loading from "../Component/Loading.vue";
    import Media from "../Type/Media";
    import FileModal from "../Component/File/FileModal.vue";

    @Component({
        components: {FileModal, Loading}
    })
    export default class FileField extends Vue {
        @Prop() file: Media;
        @Prop() label: string;
        @Prop() category: string;
        @Prop({default: false}) canDelete: boolean;

        selected: Media | null;

        data() {
            return {
                items: [],
                selected: this.file,
                open: false,
            }
        }

        selectFile(item: Media) {
            this.$emit('input', item);
            this.$refs.fileModal.open = false;
            return false;
        }

        removeImage() {
            this.selected = null;
        }

        openModal() {
            this.$refs.fileModal.open = true;
        }

        @Watch('selected')
        onFileUpdate(newFile, oldValue) {
            if (newFile !== null && oldValue !== null && newFile.id === oldValue.id) {
                return;
            }
            this.$emit('input', this.selected)
        }
    }
</script>

<style lang="scss" scoped>
</style>
