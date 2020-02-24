import { AxiosInstance } from 'axios'
import IdData from '../Model/IdData'
import AbstractDataResource from './AbstractDataResource'

export default class DefaultDataResource<T extends IdData<any>> extends AbstractDataResource<T> {
  // eslint-disable-next-line
  constructor (axios: AxiosInstance, dataName: string) {
    super(axios, dataName)
  }
}
