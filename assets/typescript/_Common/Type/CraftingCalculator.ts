import Item from '../Model/Item'
import Recipe from '../Model/Recipe'
import RecipeOutput from '../Model/RecipeOutput'
import RecipeComponent from '../Model/RecipeComponent'

export default class CraftingCalculator {
  private readonly recipe: Recipe
  readonly machine: Item
  private transport: Item | undefined

  private speedModule: Item | undefined
  private nbSpeedModule: number
  private productivityModule: Item | undefined
  private nbProductivityModule: number

  constructor (recipe: Recipe, machine: Item) {
    if (machine === undefined || machine.craftingSpeed === undefined) {
      throw new Error('You must provide a machine with craftingSpeed setup to CraftingCalculator')
    }

    this.recipe = recipe
    this.machine = machine
  }

  setTransport (transport: Item) {
    this.transport = transport
  }

  setSpeedModule (module: Item | undefined = undefined, nbModule: number = 0) {
    this.speedModule = module
    this.nbSpeedModule = nbModule
  }

  setProductivityModule (module: Item | undefined = undefined, nbModule: number = 0) {
    this.productivityModule = module
    this.nbProductivityModule = nbModule
  }

  craftingSpeed () {
    if (this.machine.craftingSpeed === undefined) {
      throw new Error('You must provide a machine with craftingSpeed setup to CraftingCalculator')
    }
    return this.machine.craftingSpeed * this.speedBonus()
  }

  craftingTime () {
    return this.recipe.craftingTime / this.craftingSpeed()
  }

  componentInputNeeded (component: RecipeComponent) {
    return component.quantity / this.craftingTime()
  }

  componentInputTransportNeeded (component: RecipeComponent) {
    if (this.transport === undefined || this.transport.itemPerSecond === undefined) {
      throw new Error('You must provide a transport with itemPerSecond setup to CraftingCalculator')
    }
    return this.componentInputNeeded(component) / this.transport.itemPerSecond
  }

  componentInputTransportSupportedMachine (component: RecipeComponent) {
    if (this.transport === undefined || this.transport.itemPerSecond === undefined) {
      throw new Error('You must provide a transport with itemPerSecond setup to CraftingCalculator')
    }
    return this.transport.itemPerSecond / this.componentInputNeeded(component)
  }


  outputPerSecond (recipeOutput: RecipeOutput) {
    return (recipeOutput.quantity * (1 + this.productivityBonus())) / this.craftingTime()
  }

  outputPerCraft (output: RecipeOutput) {
    return output.quantity / this.craftingTime()
  }

  outputTransportNeeded (recipeOutput: RecipeOutput) {
    if (this.transport === undefined || this.transport.itemPerSecond === undefined) {
      throw new Error('You must provide a transport with itemPerSecond setup to CraftingCalculator')
    }
    return (this.outputPerSecond(recipeOutput) / this.transport.itemPerSecond)
  }

  outputSupporterMachine (recipeOutput: RecipeOutput) {
    if (this.transport === undefined || this.transport.itemPerSecond === undefined) {
      throw new Error('You must provide a transport with itemPerSecond setup to CraftingCalculator')
    }
    return this.transport.itemPerSecond / this.outputTransportNeeded(recipeOutput)
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
