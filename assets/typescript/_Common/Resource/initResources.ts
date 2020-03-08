import axios from 'axios'
import config from '../../config'
import ModResource from './ModResource'
import ItemResource from './ItemResource'
import RecipeResource from './RecipeResource'
import RecipeComponentResource from './RecipeComponentResource'
import RecipeOutputResource from './RecipeOutputResource'

const client = axios.create({ baseURL: config.api.baseURL })

const modResource = new ModResource(client)
const itemResource = new ItemResource(client)
const recipeResource = new RecipeResource(client)
const recipeComponentResource = new RecipeComponentResource(client)
const recipeOutputResource = new RecipeOutputResource(client)

export default {
  modResource,
  itemResource,
  recipeResource,
  recipeComponentResource,
  recipeOutputResource
}
