import AbstractApiResource from '../../_Darkanakin41/ApiPlatform/Resource/AbstractApiResource'
import RecipeOutput from '../Model/RecipeOutput'

export default class RecipeOutputResource extends AbstractApiResource<RecipeOutput> {
  readonly prefix: string = 'recipe_outputs'
}
