import Product from '../Model/Product'
import AbstractApiResource from '../../_Darkanakin41/ApiPlatform/Resource/AbstractApiResource'

export default class ProductResource extends AbstractApiResource<Product>{
  readonly prefix: string = 'products'
}
