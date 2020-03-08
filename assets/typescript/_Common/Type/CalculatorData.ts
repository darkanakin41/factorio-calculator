import RecipeComponent from '../Model/RecipeComponent'
import RecipeOutput from '../Model/RecipeOutput'
import Recipe from '../Model/Recipe'
import Item from '../Model/Item'

export default interface CalculatorData {
  recipe: Recipe | undefined;
  components: RecipeComponent[]
  outputs: RecipeOutput[]
  transport: Item | undefined;
  machine: Item | undefined;

  speedModule: Item | undefined;
  nbSpeedModule: number;

  productivityModule: Item | undefined;
  nbProductivityModule: number;
}

export function newCalculatorData (): CalculatorData {
  return <CalculatorData>{
    recipe: undefined,
    components: [],
    outputs: [],
    transport: undefined,
    machine: undefined,
    speedModule: undefined,
    nbSpeedModule: 0,
    productivityModule: undefined,
    nbProductivityModule: 0
  }
}
