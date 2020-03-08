import AbstractApiResource from '../../_Darkanakin41/ApiPlatform/Resource/AbstractApiResource'
import Item from '../Model/Item'

export default class ItemResource extends AbstractApiResource<Item> {
  readonly prefix: string = 'items'
}
