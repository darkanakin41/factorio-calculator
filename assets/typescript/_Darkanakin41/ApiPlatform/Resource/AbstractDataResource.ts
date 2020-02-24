import IdData from '../Model/IdData'
import AbstractEntityResource from './AbstractEntityResource'

export default abstract class AbstractDataResource<T extends IdData<any>> extends AbstractEntityResource<T, string> {
  getObjectId (object: T): string {
    return object.id
  }
}
