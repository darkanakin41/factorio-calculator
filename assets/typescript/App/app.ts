import {updateMetaTagsFromRoute} from "../_Darkanakin41/Tools/pageMeta";

require('../../scss/app.scss');

import '@fortawesome/fontawesome-free/css/all.min.css';

import Vue from 'vue';
import App from './App.vue';

import router from "./_config/router";
import "../_Darkanakin41/Mixin";
import "../_Common/Mixin";

import store from "../_Common/Store";

import {vuetify} from "./_config/vuetify";

Vue.prototype.$errorMessage = '';

const app = new Vue({
    el: '#app',
    props: [],
    components: {App},
    template: '<App/>',
    vuetify: vuetify,
    router,
    store,
});

router.beforeEach((to, from, next) => {
    window.scroll(0, 0);
    updateMetaTagsFromRoute(to, from, next);
});
