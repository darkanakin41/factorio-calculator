import { Route, RouteConfig } from 'vue-router'

import IndexPage from "../IndexPage.vue"
import ModPage from "../ModPage.vue"

const routes: Array<RouteConfig> = [
  {
    name: 'mod-index',
    path: '/mod/',
    component: IndexPage
  },
  {
    name: 'mod-create',
    path: '/mod/create',
    component: ModPage,
  },
  {
    name: 'mod-edit',
    path: '/mod/:id',
    component: ModPage,
    props: (route: Route) => {
      return { id: route.params.id }
    }
  }
]

export default routes
