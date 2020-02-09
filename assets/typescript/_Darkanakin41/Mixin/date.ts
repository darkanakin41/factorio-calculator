import Vue from 'vue';
import moment from 'moment';
let dateMixins = {
    methods: {
        /**
         * Format the date in dd/mm/yyyy
         * @param date
         */
        formatDate(date: any) {
            if (date === undefined || date === "" || date === null) {
                return "";
            }

            let dateObject:Date;
            if (date instanceof Date) {
                dateObject = date;
            }else{
                dateObject = new Date(date);
            }

            return moment(date).format('DD/MM/YYYY');
        },

        /**
         * Format the date in dd/mm/yyyy H:i:s
         * @param date
         */
        formatDateFull(date: any) {
            if (date === undefined || date === "" || date === null) {
                return "";
            }

            let dateObject:Date;
            if (date instanceof Date) {
                dateObject = date;
            }else{
                dateObject = new Date(date);
            }

            let dateString = this.formatDate(dateObject);
            let timeString = this.extractTime(dateObject);

            return (`${dateString} à ${timeString}`);
        },

        /**
         * Format the date in yyyy-mm-dd
         * @param date
         */
        extractYearMonthDay(date: Date | undefined) {
            if (date === undefined) {
                return "";
            }

            return moment(date).format('YYYY-MM-DD');
        },

        /**
         * Format the date in dd/mm/yyyy
         * @param date
         */
        extractTime(date: Date | undefined) {
            if (date === undefined) {
                return "";
            }

            return moment(date).format('HH:mm:ss');
        },

        getCurrentTimeOffset(){
            return '+02:00';
        }
    }
};

Vue.mixin(dateMixins);

export default dateMixins;
