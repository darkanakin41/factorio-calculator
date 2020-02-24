import AbstractResource from './AbstractResource'
import Page from '../Model/Page'
import ApiSearch from '../Model/ApiSearch'
import ApiSort from '../Model/ApiSort'
import createPropsParams from '../Function/createPropsParams'
import AxiosResponseExt from '../Model/AxiosResponseExt'

export default abstract class AbstractApiResource<T> extends AbstractResource {
  abstract readonly prefix: string


  get (payload?: { page?: Page, props?: string[], searches?: ApiSearch[], sort?: ApiSort }) {
    let path = this.prefix

    if (!payload) payload = {}
    const params: string[] = []
    if (payload.props) {
      params.push(createPropsParams(payload.props))
    }

    if (payload.searches) {
      for (const search of payload.searches) {
        if (search.type) {
          params.push(`${search.field}[${search.type}]=${search.query}`)
        } else {
          params.push(`${search.field}=${search.query}`)
        }
      }
    }

    if (payload.sort) {
      params.push(`order[${payload.sort.field}]=${payload.sort.desc ? 'desc' : 'asc'}`)
    }

    if (payload.page) {
      if (payload.page.page) {
        params.push(`page=${payload.page.page}`)
      }
      if (payload.page.itemsPerPage) {
        params.push(`itemsPerPage=${payload.page.itemsPerPage}`)
      }
    }

    const url = `${path}?${params.join('&')}`
    let promise = this.wrapPromise(this.axios.get(url))
    return promise as Promise<T[] & AxiosResponseExt>
  }

  getOne (id: number | string) {
    let path = `${this.prefix}/${id}`

    let promise = this.wrapPromise(this.axios.get(path))
    return promise as Promise<T & AxiosResponseExt>
  }

  post (item: T) {
    let path = this.prefix

    let promise = this.wrapPromise(this.axios.post(path, item))
    return promise as Promise<T & AxiosResponseExt>
  }

  delete (id: number | string) {
    let path = `${this.prefix}/${id}`

    let promise = this.wrapPromise(this.axios.delete(path))
    return promise as Promise<T & AxiosResponseExt>
  }

  put (id: number | string, item: T) {
    let path = `${this.prefix}/${id}`

    let promise = this.wrapPromise(this.axios.put(path, item))
    return promise as Promise<T & AxiosResponseExt>
  }

  patch (id: number | string, item: T) {
    let path = `${this.prefix}/${id}`

    let promise = this.wrapPromise(this.axios.patch(path, item, {
      headers: {
        'Content-Type': 'application/merge-patch+json'
      }
    }))
    return promise as Promise<T & AxiosResponseExt>
  }
}
