import {RouteConfig} from "vue-router";

import CalculatePage from "../CalculatePage.vue"

const routes: Array<RouteConfig> = [
    {
        name: 'calculate',
        path: '/calculate',
        component: CalculatePage
    },
];

export default routes;
