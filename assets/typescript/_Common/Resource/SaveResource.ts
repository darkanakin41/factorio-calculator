import AbstractApiResource from '../../_Darkanakin41/ApiPlatform/Resource/AbstractApiResource'
import Save from "../Model/Save";

export default class SaveResource extends AbstractApiResource<Save> {
  readonly prefix: string = 'saves'
}
