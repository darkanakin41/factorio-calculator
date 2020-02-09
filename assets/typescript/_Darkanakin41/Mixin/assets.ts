import Vue from 'vue';

let assetMixins = {
    methods: {
        /**
         * Generate the full URL of an asset
         * @param path the path of the asset
         */
        renderAsset(path: string) {
            if(path.indexOf('http://') === 0 || path.indexOf('https://') === 0){
                return path;
            }
            if(path.indexOf('/') !== 0){
                return "/" + path;
            }
            return path;
        }
    }
};

Vue.mixin(assetMixins);

export default assetMixins;
