import {client} from "../Services/axios";

import ModResource from './ModResource'
import ItemResource from './ItemResource'
import RecipeResource from './RecipeResource'
import RecipeComponentResource from './RecipeComponentResource'
import RecipeOutputResource from './RecipeOutputResource'
import AuthResource from "./AuthResource";
import UserResource from "./UserResource";
import SaveResource from "./SaveResource";

const authResource = new AuthResource(client)
const modResource = new ModResource(client)
const itemResource = new ItemResource(client)
const recipeResource = new RecipeResource(client)
const recipeComponentResource = new RecipeComponentResource(client)
const recipeOutputResource = new RecipeOutputResource(client)
const saveResource = new SaveResource(client)
const userResource = new UserResource(client)

export default {
    authResource,
    modResource,
    itemResource,
    recipeResource,
    recipeComponentResource,
    recipeOutputResource,
    saveResource,
    userResource
}
