import {updateMetaTagsFromRoute} from "../_Darkanakin41/Tools/pageMeta";

require('../../scss/app.scss');

import '@fortawesome/fontawesome-free/css/all.min.css';

import Vue from 'vue';
import App from './App.vue';

import router from "./_config/router";
import "../_Darkanakin41/Mixin";
import "../_Common/Mixin";
import services from '../_Common/Resource/initResources'

import store from "../_Common/Store";
import Editor from '@tinymce/tinymce-vue';

import {vuetify} from "./_config/vuetify";

Vue.prototype.$services = services
Vue.prototype.$errorMessage = '';
Vue.component('tinymce-editor', Editor);

const app = new Vue({
    el: '#app',
    props: [],
    components: {App},
    template: '<App/>',
    vuetify: vuetify,
    router,
    store,
    provide: { ...services },
});

router.beforeEach((to, from, next) => {
    window.scroll(0, 0);
    updateMetaTagsFromRoute(to, from, next);
});
