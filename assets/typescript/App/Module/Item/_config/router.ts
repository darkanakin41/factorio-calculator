import { Route, RouteConfig } from 'vue-router'

import IndexPage from "../IndexPage.vue"
import ItemPage from "../ItemPage.vue"

const routes: Array<RouteConfig> = [
  {
    name: 'item-index',
    path: '/item/',
    component: IndexPage
  },
  {
    name: 'item-create',
    path: '/item/create',
    component: ItemPage,
  },
  {
    name: 'item-edit',
    path: '/item/:id',
    component: ItemPage,
    props: (route: Route) => {
      return { id: route.params.id }
    }
  }
]

export default routes
