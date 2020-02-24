import axios from 'axios'
import config from '../../config'
import ProductResource from './ProductResource'
import ProductComponentResource from './ProductComponentResource'

const client = axios.create({ baseURL: config.api.baseURL })

const productResource = new ProductResource(client)
const productComponentResource = new ProductComponentResource(client)

export default {
  productResource,
  productComponentResource
}
