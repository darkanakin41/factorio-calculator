import Product from '../Model/Product'
import ProductComponent from '../Model/ProductComponent'

export default class CraftingComponentCalculator {
  private readonly product: Product
  readonly machine: Product
  private transport: Product | undefined

  private speedModule: Product | undefined
  private nbSpeedModule: number
  private productivityModule: Product | undefined
  private nbProductivityModule: number

  constructor (product: Product, machine: Product) {
    if (machine === undefined || machine.craftingSpeed === undefined) {
      throw new Error('You must provide a machine with craftingSpeed setup to CraftingComponentCalculator')
    }

    this.product = product
    this.machine = machine
  }

  setTransport (transport: Product) {
    this.transport = transport
  }

  setSpeedModule (module: Product | undefined = undefined, nbModule: number = 0) {
    this.speedModule = module
    this.nbSpeedModule = nbModule
  }

  setProductivityModule (module: Product | undefined = undefined, nbModule: number = 0) {
    this.productivityModule = module
    this.nbProductivityModule = nbModule
  }

  craftingSpeed () {
    if (this.machine.craftingSpeed === undefined) {
      throw new Error('You must provide a machine with craftingSpeed setup to CraftingComponentCalculator')
    }
    return this.machine.craftingSpeed * this.speedBonus()
  }

  craftingTime () {
    return this.product.craftingTime / this.craftingSpeed()
  }

  outputPerSecond () {
    return (this.product.output * (1 + this.productivityBonus())) / this.craftingTime()
  }

  outputTransportNeeded () {
    if (this.transport === undefined || this.transport.itemPerSecond === undefined) {
      throw new Error('You must provide a transport with itemPerSecond setup to CraftingComponentCalculator')
    }
    return (this.outputPerSecond() / this.transport.itemPerSecond)
  }

  componentInputNeeded (component: ProductComponent) {
    return component.quantity / this.craftingTime()
  }

  componentInputTransportNeeded (component: ProductComponent) {
    if (this.transport === undefined || this.transport.itemPerSecond === undefined) {
      throw new Error('You must provide a transport with itemPerSecond setup to CraftingComponentCalculator')
    }
    return this.componentInputNeeded(component) / this.transport.itemPerSecond
  }

  componentInputTransportSupportedMachine (component: ProductComponent) {
    if (this.transport === undefined || this.transport.itemPerSecond === undefined) {
      throw new Error('You must provide a transport with itemPerSecond setup to CraftingComponentCalculator')
    }
    return this.transport.itemPerSecond / this.componentInputNeeded(component)
  }

  speedBonus () {
    let bonus = 0
    if (this.speedModule !== undefined && this.speedModule.speed !== undefined) {
      bonus += (this.nbSpeedModule * this.speedModule.speed)
    }
    if (this.productivityModule !== undefined && this.productivityModule.speed !== undefined) {
      bonus += (this.nbProductivityModule * this.productivityModule.speed)
    }
    if (bonus === 0) {
      return 1
    }
    return bonus
  }

  productivityBonus () {
    let bonus = 0
    if (this.productivityModule !== undefined && this.productivityModule.productivity !== undefined) {
      bonus += (this.nbProductivityModule * this.productivityModule.productivity)
    }
    return bonus
  }
}
