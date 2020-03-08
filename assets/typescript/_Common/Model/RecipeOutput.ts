import IdData from '../../_Darkanakin41/ApiPlatform/Model/IdData'
import Item from './Item'
import Recipe from './Recipe'

export default interface RecipeOutput extends IdData<string> {
  recipe: Recipe | null,
  output: Item | null,
  quantity: number,
}

export function newRecipeOutput (recipe: Recipe): RecipeOutput {
  return <RecipeOutput>{
    recipe: recipe,
    quantity: 1
  }
}
