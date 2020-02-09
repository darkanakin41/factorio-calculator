import {RouteConfig} from "vue-router";

const routes: Array<RouteConfig> = [
    {
        name: 'product-index',
        path: '/products',
        component: () => {
            return import("../IndexPage.vue")
        }
    },
];

export default routes;
