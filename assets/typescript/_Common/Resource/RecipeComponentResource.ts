import AbstractApiResource from '../../_Darkanakin41/ApiPlatform/Resource/AbstractApiResource'
import RecipeComponent from '../Model/RecipeComponent'

export default class RecipeComponentResource extends AbstractApiResource<RecipeComponent> {
  readonly prefix: string = 'recipe_components'
}
