import AbstractResource from "../../_Darkanakin41/ApiPlatform/Resource/AbstractResource";
import AxiosResponseExt from "../../_Darkanakin41/ApiPlatform/Model/AxiosResponseExt";

export interface TokenData {
    token: string
    refresh_token: string
}

export default class AuthResource extends AbstractResource {
    private readonly _prefix = '/auth'

    login(payload?: { username?: string, password?: string }) {
        if (!payload) {
            payload = {}
        }
        const url = `${this._prefix}/login`
        return this.wrapPromise(this.axios.post(url, payload)) as Promise<TokenData & AxiosResponseExt>
    }

    refreshToken(payload: { refresh_token: string }) {
        const url = `${this._prefix}/token-refresh`
        return this.wrapPromise(this.axios.post(url, payload)) as Promise<TokenData & AxiosResponseExt>
    }

    logout() {
        const url = `${this._prefix}/logout`
        return this.wrapPromise(this.axios.post(url)) as Promise<AxiosResponseExt>
    }
}
