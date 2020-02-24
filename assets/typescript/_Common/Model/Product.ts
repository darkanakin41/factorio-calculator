import ProductComponent from '../Model/ProductComponent'
import IdData from '../../_Darkanakin41/ApiPlatform/Model/IdData'

export default class Product extends IdData<number> {
  name: string;
  type: string;
  utility: string;
  craftingTime: number;
  baseProductivity: number;
  output: number;

  components: ProductComponent[];

  // Transport
  itemPerSecond: number | undefined;

  // Machine
  craftingSpeed: number | undefined;

  // Modules
  energyConsumption: number | undefined; // Speed Module  & Efficiency Module & Productivity Module
  speed: number | undefined; // Speed Module & Productivity Module
  polution: number | undefined; // Efficiency Module & Productivity Module & Machine
  productivity: number | undefined; // Productivity Module
}


export function newProduct(): Product {
  return <Product>{
    id: null,
    name: '',
    craftingTime: 1,
    baseProductivity: 1,
    output: 1,
    type: 'item',
    utility: 'component',
    itemPerSecond: undefined,
    craftingSpeed: undefined,
    components: [],
    energyConsumption: undefined,
    speed: undefined,
    polution: undefined,
    productivity: undefined,
  };
}
