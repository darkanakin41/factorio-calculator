import AbstractApiResource from '../../_Darkanakin41/ApiPlatform/Resource/AbstractApiResource'
import Mod from '../Model/Mod'

export default class ModResource extends AbstractApiResource<Mod> {
  readonly prefix: string = 'mods'
}
