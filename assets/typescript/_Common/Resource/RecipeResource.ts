import AbstractApiResource from '../../_Darkanakin41/ApiPlatform/Resource/AbstractApiResource'
import Recipe from '../Model/Recipe'

export default class RecipeResource extends AbstractApiResource<Recipe> {
  readonly prefix: string = 'recipes'
}
