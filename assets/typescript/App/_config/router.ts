import Vue from 'vue';
import VueRouter, {RouteConfig} from "vue-router";

import indexRoute from "../Module/Index/_config/router";
import productRoute from "../Module/Product/_config/router";
Vue.use(VueRouter);

const baseRoutes: Array<RouteConfig> = [];

const routes: Array<RouteConfig> = baseRoutes.concat(indexRoute,productRoute,
    [{
        path: '*',
        redirect: 'calculate'
    }]
);

const router = new VueRouter({
    mode: 'history',
    base: 'app',
    linkActiveClass: '',
    linkExactActiveClass: 'active',
    routes: routes
});

export default router;
