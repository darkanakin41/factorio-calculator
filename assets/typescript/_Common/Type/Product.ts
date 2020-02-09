import _AbstractType from "../../_Darkanakin41/Type/_AbstractType";
import ProductComponent from "./ProductComponent";

export default interface Product extends _AbstractType {
    name: string;
    type: string;
    utility: string;
    craftingTime: number;
    output: number;

    // Transport
    itemPerSecond: number | undefined;

    // Machine
    craftingSpeed: number | undefined;

    // Modules
    energyConsumption: number | undefined; // Speed Module  & Efficiency Module & Productivity Module
    speed: number | undefined; // Speed Module & Productivity Module
    polution: number | undefined; // Efficiency Module & Productivity Module & Machine
    productivity: number | undefined; // Productivity Module

    components: Array<ProductComponent>
}

export function newProduct(): Product {
    return <Product>{
        id: null,
        name: '',
        craftingTime: 1,
        output: 1,
        type: 'item',
        utility: 'component',
        itemPerSecond: undefined,
        craftingSpeed: undefined,
        components: [],
        energyConsumption: undefined,
        speed: undefined,
        polution: undefined,
        productivity: undefined,
    };
}
