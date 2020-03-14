import {RouteConfig} from 'vue-router'

import LoginPage from "../LoginPage.vue"
import LogoutPage from "../LogoutPage.vue"
import RegistrationPage from "../RegistrationPage.vue"

const routes: Array<RouteConfig> = [
    {
        name: 'security-sign-in',
        path: '/security/sign-in',
        component: LoginPage,
        meta: {
            access: {allowAnonymous: true},
            layout: {noNav: true}
        }
    },
    {
        name: 'security-sign-up',
        path: '/security/sign-up',
        component: RegistrationPage,
        meta: {
            access: {allowAnonymous: true},
            layout: {noNav: true}
        }
    },
    {
        name: 'security-sign-out',
        path: '/security/sign-out',
        component: LogoutPage,
        meta: {
            access: {allowAnonymous: false},
            layout: {noNav: true}
        }
    },
]

export default routes
