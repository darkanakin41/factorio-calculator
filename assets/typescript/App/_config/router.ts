import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import indexRoute from '../Module/Index/_config/router'
import itemRoute from '../Module/Item/_config/router'
import modRoute from '../Module/Mod/_config/router'
import recipeRoute from '../Module/Recipe/_config/router'

Vue.use(VueRouter)

const baseRoutes: Array<RouteConfig> = []

const routes: Array<RouteConfig> = baseRoutes.concat(indexRoute, itemRoute, modRoute, recipeRoute,
  [{
    path: '*',
    redirect: 'calculate'
  }]
)

const router = new VueRouter({
  mode: 'history',
  base: 'app',
  linkActiveClass: '',
  linkExactActiveClass: 'active',
  routes: routes
})

export default router
