import IdData from '../../_Darkanakin41/ApiPlatform/Model/IdData'
import Mod from './Mod'

export default class Item extends IdData<string> {
  name: string
  type: string
  utility: string

  mod?: Mod

  // Transport
  itemPerSecond: number | undefined

  // Machine
  craftingSpeed: number | undefined

  // Modules
  energyConsumption: number | undefined // Speed Module  & Efficiency Module & Productivity Module
  speed: number | undefined // Speed Module & Productivity Module
  polution: number | undefined // Efficiency Module & Productivity Module & Machine
  productivity: number | undefined // Productivity Module

}


export function newItem (): Item {
  return <Item>{
    name: '',
    type: 'item',
    utility: 'component'
  }
}
