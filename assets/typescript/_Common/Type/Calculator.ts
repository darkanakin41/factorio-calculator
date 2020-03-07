import Product from '../Model/Product'
import ProductComponent from '../Model/ProductComponent'

export default interface Calculator {
  product: Product | undefined;
  components: ProductComponent[]
  transport: Product | undefined;
  machine: Product | undefined;

  speedModule: Product | undefined;
  nbSpeedModule: number;

  productivityModule: Product | undefined;
  nbProductivityModule: number;
}

export function newCalculator (): Calculator {
  return <Calculator>{
    product: undefined,
    components: [],
    transport: undefined,
    machine: undefined,
    speedModule: undefined,
    nbSpeedModule: 0,
    productivityModule: undefined,
    nbProductivityModule: 0
  }
}
