import { CancelTokenSource } from 'axios'
import AbstractGetEntityResource from './AbstractGetEntityResource'
import AxiosResponseExt from '../Model/AxiosResponseExt'

export default abstract class AbstractEntityResource<T, K> extends AbstractGetEntityResource<T, K> {
  abstract getObjectId (object: T): K

  getPathFromObject (object?: T) {
    if (object === undefined) {
      return this.getPath()
    } else {
      let id = this.getObjectId(object)
      return this.getPath(id)
    }
  }

  getFromObject (object: T): Promise<T & AxiosResponseExt> {
    return this.get(this.getObjectId(object))
  }

  list (cancelTokenSource?: CancelTokenSource): Promise<T[] & AxiosResponseExt> {
    let cancelOptions = cancelTokenSource ? { cancelToken: cancelTokenSource.token } : undefined
    let promise = this.wrapPromise(this.axios.get(this.getPath(), cancelOptions))
    return promise as Promise<T[] & AxiosResponseExt>
  }

  create (object: T): Promise<T & AxiosResponseExt> {
    return this.wrapPromise(this.axios.post(this.getPath(), object)) as Promise<T & AxiosResponseExt>
  }

  deleteFromObject (object: T): Promise<T & AxiosResponseExt> {
    return this.delete(this.getObjectId(object))
  }

  delete (id: K): Promise<T & AxiosResponseExt> {
    let path = this.getPath(id)
    return this.wrapPromise(this.axios.delete(path)) as Promise<T & AxiosResponseExt>
  }

  update (object: T): Promise<T & AxiosResponseExt> {
    let path = this.getPathFromObject(object)
    return this.wrapPromise(this.axios.put(path, object)) as Promise<T & AxiosResponseExt>
  }
}
