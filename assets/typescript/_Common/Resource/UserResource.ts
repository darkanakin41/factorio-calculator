import AbstractApiResource from '../../_Darkanakin41/ApiPlatform/Resource/AbstractApiResource'
import Recipe from '../Model/Recipe'
import User from "../Model/User";

export default class UserResource extends AbstractApiResource<User> {
  readonly prefix: string = 'users'
}
