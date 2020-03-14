import axios from 'axios'
import config from '../../config'
import ModResource from './ModResource'
import ItemResource from './ItemResource'
import RecipeResource from './RecipeResource'
import RecipeComponentResource from './RecipeComponentResource'
import RecipeOutputResource from './RecipeOutputResource'
import AuthResource from "./AuthResource";
import {client} from "../Services/axios";
import UserResource from "./UserResource";

const authResource = new AuthResource(client)
const modResource = new ModResource(client)
const itemResource = new ItemResource(client)
const recipeResource = new RecipeResource(client)
const recipeComponentResource = new RecipeComponentResource(client)
const recipeOutputResource = new RecipeOutputResource(client)
const userResource = new UserResource(client)

export default {
  authResource,
  modResource,
  itemResource,
  recipeResource,
  recipeComponentResource,
  recipeOutputResource,
  userResource
}
