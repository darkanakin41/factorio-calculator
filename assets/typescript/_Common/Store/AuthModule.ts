import {Action, Module, Mutation, VuexModule} from 'vuex-module-decorators'
import User from "../Model/User";
import resources from "../Resource/initResources"
import jwt_decode from 'jwt-decode'
import {TokenData} from "../Resource/AuthResource";

interface JWTToken {
    iat: number
    exp: number
    roles: string[]
    username: string
}

const CHECK_TOKEN_EACH = 60
const LIMIT_EXPIRE_IN = 60

@Module({
    name: 'auth',
    namespaced: true
})
export default class AuthModule extends VuexModule {

    _user: User | null = null

    get authenticated(): boolean {
        return !!this.user
    }

    get user() {
        return this._user
    }

    get role() {
        if (this.user) {
            return this.user.roles
        }

        return []
    }

    @Mutation
    resetState() {
        this._user = null
    }

    @Mutation
    setUser(user: User | null) {
        this._user = user
    }

    @Action({rawError: true})
    async tryGetUser(payload?: { username?: string, password?: string }) {
        if (this.authenticated) {
            return this._user
        }
        let localStorageTokensRaw = localStorage.getItem('tokens')
        let res: TokenData | null = null

        if (localStorageTokensRaw) {
            try {
                let data: TokenData = JSON.parse(localStorageTokensRaw)
                res = await resources.authResource.refreshToken({refresh_token: data.refresh_token})
                let tokenData: JWTToken = jwt_decode(res.token)
                this.setUser({
                    access_token: res.token,
                    roles: tokenData.roles,
                    refresh_token: res.refresh_token,
                    username: tokenData.username
                })
            } catch (error) {
                this.logout()
            }
        } else if (payload) {
            res = await resources.authResource.login(payload)
        }

        if(res){
            let data: JWTToken = jwt_decode(res.token)
            this.setUser({
                access_token: res.token,
                roles: data.roles,
                refresh_token: res.refresh_token,
                username: data.username
            })
            setInterval(() => {
                if (this.user && this.user.access_token) {
                    let tokenData: JWTToken = jwt_decode(this.user.access_token)
                    let expireIn = (tokenData.exp * 1000) - new Date().getTime();
                    if (expireIn < (LIMIT_EXPIRE_IN * 1000)) {
                        this.renewToken()
                    }
                }
            }, (CHECK_TOKEN_EACH * 1000))
            localStorage.setItem('tokens', JSON.stringify(res))
        }
        return this.user
    }

    @Action({rawError: true})
    logout(){
        this.setUser(null)
        localStorage.removeItem('tokens')
    }

    @Action({rawError: true})
    async renewToken() {
        if (this.user && this.user.refresh_token) {
            let res = await resources.authResource.refreshToken({refresh_token: this.user.refresh_token})
            localStorage.setItem('tokens', JSON.stringify(res))
            this.user.access_token = res.token
            this.user.refresh_token = res.refresh_token
        }
    }
}
