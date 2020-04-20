import IdData from '../../_Darkanakin41/ApiPlatform/Model/IdData'
import Mod from './Mod'

export default class Recipe extends IdData<string> {
  name: string
  craftingTime: number

  mod: Mod | null
}


export function newRecipe (): Recipe {
  return <Recipe>{
    name: '',
    craftingTime: 1
  }
}
