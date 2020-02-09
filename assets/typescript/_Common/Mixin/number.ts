import Vue from 'vue';

let numberMixins = {
    methods: {
        /**
         * Round the number
         * @param {number} number the number to round
         * @param {number} decimal the number of decimal to display
         */
        numberRound(number: number, decimal: number = 2) {
            let multiplicator = Math.pow(10, decimal);
            return Math.round(number * multiplicator) / multiplicator
        },

        /**
         * Display the number as percent value (multiply by 100)
         * @param {number} number the number to display
         */
        numberToPercent(number: number) {
            return number * 100;
        }
    }
};

Vue.mixin(numberMixins);

export default numberMixins;
