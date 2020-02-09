import Vue from 'vue';
import Nomenclature from "../Nomenclature/type";

let nomenclatureMixins = {
    methods: {
        /**
         * Retrieve the country label based on his id
         * @param nomenclature the nomenclature
         * @param value
         */
        getNomenclatureLabel(nomenclature:Array<Nomenclature>, value: string) {
            let item = nomenclature.find((c:Nomenclature) => c.value === value);
            if(item !== undefined){
                return item.label;
            }
            return "Unknown";
        },
        /**
         * Retrieve the country id based on his label
         * @param nomenclature the nomenclature
         * @param label the label to search for
         */
        getNomenclatureId(nomenclature:Array<Nomenclature>, label: string) {
            let item = nomenclature.find((c:any) => c.label === label);
            if(item !== undefined){
                return item.value;
            }
            return "Unknown";
        }
    }
};

Vue.mixin(nomenclatureMixins);

export default nomenclatureMixins;
