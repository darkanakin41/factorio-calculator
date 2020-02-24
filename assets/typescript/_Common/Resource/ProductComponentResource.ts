import AbstractApiResource from '../../_Darkanakin41/ApiPlatform/Resource/AbstractApiResource'
import ProductComponent from '../Model/ProductComponent'

export default class ProductResource extends AbstractApiResource<ProductComponent> {
  readonly prefix: string = 'product_components'
}
