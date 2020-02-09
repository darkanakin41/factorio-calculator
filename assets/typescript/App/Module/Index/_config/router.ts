import {RouteConfig} from "vue-router";

const routes: Array<RouteConfig> = [
    {
        name: 'calculate',
        path: '/calculate',
        component: () => {
            return import("../CalculatePage.vue")
        }
    },
];

export default routes;
