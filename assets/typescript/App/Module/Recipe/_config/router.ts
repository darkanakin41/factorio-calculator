import { Route, RouteConfig } from 'vue-router'

import IndexPage from "../IndexPage.vue"
import RecipePage from "../RecipePage.vue"

const routes: Array<RouteConfig> = [
  {
    name: 'recipe-index',
    path: '/recipe/',
    component: IndexPage
  },
  {
    name: 'recipe-create',
    path: '/recipe/create',
    component: RecipePage,
  },
  {
    name: 'recipe-edit',
    path: '/recipe/:id',
    component: RecipePage,
    props: (route: Route) => {
      return { id: route.params.id }
    }
  }
]

export default routes
