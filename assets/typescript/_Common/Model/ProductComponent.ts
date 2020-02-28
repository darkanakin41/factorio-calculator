import Product from './Product'
import IdData from '../../_Darkanakin41/ApiPlatform/Model/IdData'

export default interface ProductComponent extends IdData<string> {
  product: Product | null,
  component: Product | null,
  quantity: number,
}

export function newProductComponent (product: Product): ProductComponent {
  return <ProductComponent>{
    id: null,
    product: product,
    component: null,
    quantity: 1
  }
}
