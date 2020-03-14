import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import {authModule, snackbarModule} from "../Store";
import config from '../../config'
import router from "../../App/_config/router";
const client = axios.create({ baseURL: config.api.baseURL })

client.interceptors.request.use((config: AxiosRequestConfig) => {
    if (authModule.authenticated && authModule.user && authModule.user.access_token) {
        config.headers['Authorization'] = `Bearer ${authModule.user.access_token}`
    }
    return config
})

client.interceptors.response.use((res: AxiosResponse) => res, (error) => {
    const responseMessage = error.response.data ? error.response.data.message : undefined

    if ((error.response.status === 401 && responseMessage && responseMessage === 'Expired JWT Token') ||
        (error.response.status === 401 && /Refresh token .* is invalid\./g.test(responseMessage))) {
        snackbarModule.setSnackbarEntry({
            icon: 'mdi-alert-circle',
            title: 'La session a expiré.',
            message: 'Veuillez vous connecter à nouveau',
            color: 'info',
            button: {
                text: 'Connexion',
                icon: 'mdi-login',
                action: () => {
                    router.push({name: 'security-sign-in'})
                }
            }
        })
    } else {
        snackbarModule.setSnackbarEntry({
            icon: 'mdi-alert-circle',
            title: `Oops! Une erreur ${error.response.status} est survenue.`,
            message: responseMessage,
            color: 'info'
        })
    }
    return Promise.reject(error)
})

export {
    client
}
