import { AxiosInstance, CancelTokenSource } from 'axios'
import AbstractResource from './AbstractResource'
import AxiosResponseExt from '../Model/AxiosResponseExt'

export default abstract class AbstractGetEntityResource<T, K> extends AbstractResource {
  private prefix: string

  constructor (axios: AxiosInstance, prefix: string) {
    super(axios)
    this.prefix = prefix
  }

  getPath (id?: K): string {
    if (id === undefined) {
      return this.prefix
    } else {
      let idPath = this.getIdPathRepresentation(id)
      return `${this.prefix}/${idPath}`
    }
  }

  getIdPathRepresentation (id: K): string {
    return '' + id
  }

  get (id: K, cancelTokenSource?: CancelTokenSource): Promise<T & AxiosResponseExt> {
    let path = this.getPath(id)
    let cancelOptions = cancelTokenSource ? { cancelToken: cancelTokenSource.token } : undefined
    let promise = this.wrapPromise(this.axios.get(path, cancelOptions))
    return promise as Promise<T & AxiosResponseExt>
  }
}
