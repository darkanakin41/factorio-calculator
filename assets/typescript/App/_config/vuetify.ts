import Vue from 'vue';

import Vuetify from 'vuetify'
require('vuetify/dist/vuetify.min.css');
require('@mdi/font/css/materialdesignicons.css');

Vue.use(Vuetify);

import fr from "vuetify/src/locale/fr";

fr.dataIterator.loadingText = "Chargement des items ...";
fr.close = "Fermer";

export const primaryColor = '#D74B4B';
export const secondaryColor = '#515151';

const options = {
    dark: true,
    lang: {
        locales: {fr},
        current: 'fr',
    },
    themes: {
        dark: {
            primary: primaryColor,
            secondary: secondaryColor,
        }
    },
};

export const vuetify = new Vuetify(options);
