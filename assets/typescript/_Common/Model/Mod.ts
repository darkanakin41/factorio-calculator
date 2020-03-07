import IdData from '../../_Darkanakin41/ApiPlatform/Model/IdData'

export default class Mod extends IdData<string> {
  name: string
  description?: string
  websiteUrl?: string
  sourceUrl?: string
}


export function newMod (): Mod {
  return <Mod>{
    id: null,
    name: ''
  }
}
