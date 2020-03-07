import axios from 'axios'
import config from '../../config'
import ProductResource from './ProductResource'
import ProductComponentResource from './ProductComponentResource'
import ModResource from './ModResource'

const client = axios.create({ baseURL: config.api.baseURL })

const productResource = new ProductResource(client)
const modResource = new ModResource(client)
const productComponentResource = new ProductComponentResource(client)

export default {
  modResource,
  productResource,
  productComponentResource
}
