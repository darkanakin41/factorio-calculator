import { Route, RouteConfig } from 'vue-router'

import IndexPage from "../IndexPage.vue"
import SavePage from "../SavePage.vue"

const routes: Array<RouteConfig> = [
  {
    name: 'save-index',
    path: '/save/',
    component: IndexPage
  },
  {
    name: 'save-create',
    path: '/save/create',
    component: SavePage,
  },
  {
    name: 'save-edit',
    path: '/save/:id',
    component: SavePage,
    props: (route: Route) => {
      return { id: route.params.id }
    }
  }
]

export default routes
