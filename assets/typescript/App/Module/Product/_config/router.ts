import { Route, RouteConfig } from 'vue-router'

const routes: Array<RouteConfig> = [
  {
    name: 'product-index',
    path: '/product/',
    component: () => {
      return import('../IndexPage.vue')
    }
  },
  {
    name: 'product-create',
    path: '/product/create',
    component: () => {
      return import('../ProductPage.vue')
    }
  },
  {
    name: 'product-edit',
    path: '/product/:id',
    component: () => {
      return import('../ProductPage.vue')
    },
    props: (route: Route) => {
      return { id: route.params.id }
    }
  }
]

export default routes
