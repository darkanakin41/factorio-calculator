import { Route, RouteConfig } from 'vue-router'

import IndexPage from "../IndexPage.vue"
import ProductPage from "../ProductPage.vue"

const routes: Array<RouteConfig> = [
  {
    name: 'product-index',
    path: '/product/',
    component: IndexPage
  },
  {
    name: 'product-create',
    path: '/product/create',
    component: ProductPage
  },
  {
    name: 'product-edit',
    path: '/product/:id',
    component: ProductPage,
    props: (route: Route) => {
      return { id: route.params.id }
    }
  }
]

export default routes
