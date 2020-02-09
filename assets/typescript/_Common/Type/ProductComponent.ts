import _AbstractType from "../../_Darkanakin41/Type/_AbstractType";
import Product from "./Product";

export default interface ProductComponent extends _AbstractType {
    product: Product|null,
    quantity: number,
}

export function newProductComponent(): ProductComponent {
    return <ProductComponent> {
        id: null,
        product: null,
        quantity: 1,
    };
}
