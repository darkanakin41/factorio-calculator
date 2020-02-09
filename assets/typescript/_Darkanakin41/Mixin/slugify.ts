import Vue from 'vue';

let slugifyMixins = {
    methods: {
        /**
         * Slugify the given text
         * @param text the text to slugify
         */
        slugify(text: string) {
            return text.toString().toLowerCase()
                .replace(/\s+/g, '-')           // Replace spaces with -
                .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
                .replace(/\-\-+/g, '-')         // Replace multiple - with single -
                .replace(/^-+/, '')             // Trim - from start of text
                .replace(/-+$/, '');            // Trim - from end of text
        }
    }
};

Vue.mixin(slugifyMixins);

export default slugifyMixins;
