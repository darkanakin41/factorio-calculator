import IdData from '../../_Darkanakin41/ApiPlatform/Model/IdData'
import Item from './Item'
import Recipe from './Recipe'

export default interface RecipeComponent extends IdData<string> {
  recipe: Recipe | null,
  component: Item | null,
  quantity: number,
}

export function newRecipeComponent (recipe: Recipe): RecipeComponent {
  return <RecipeComponent>{
    recipe: recipe,
    quantity: 1
  }
}
