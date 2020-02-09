import {RouteConfig} from "vue-router/types/router";
import Vue from 'vue';

let routerMixins = {
    methods: {
        /**
         * Search for route with given name
         * @param routes
         * @param name
         */
        getRouteByName(routes: Array<RouteConfig>, name:string){
            let route:RouteConfig|undefined;

            routes.forEach((r) => {
                if(r.name === name){
                    route = r;
                    return;
                }
                if(r.children !== undefined){
                    let found = this.getRouteByName(r.children, name);
                    if(found !== undefined){
                        route = r;
                    }
                }
            });

            return route;
        }
    }
};

Vue.mixin(routerMixins);

export default routerMixins;
