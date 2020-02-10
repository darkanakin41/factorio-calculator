import _AbstractType from "../../_Darkanakin41/Type/_AbstractType";
import Product from "./Product";

export default interface Calculator extends _AbstractType {
    product: Product | undefined;
    transport: Product | undefined;
    machine: Product | undefined;

    speedModule: Product | undefined;
    nbSpeedModule: number;

    productivityModule: Product | undefined;
    nbProductivityModule: number;
}

export function newCalculator(): Calculator {
    return <Calculator>{
        id: null,
        product: undefined,
        transport: undefined,
        machine: undefined,
        speedModule: undefined,
        nbSpeedModule: 0,
        productivityModule: undefined,
        nbProductivityModule: 0,
    };
}
