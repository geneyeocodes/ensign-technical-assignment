import { useCartStore } from "../stores/CartStore";
import CartProduct from "../types/CartProduct";
import Product from "../types/Product";

interface IProps {
    product: CartProduct;
}

export default function QuantityController({ product }: IProps) {
    const { addProduct, removeProduct } = useCartStore();
    const productProp: Product = {
        id: product.productId,
        title: product.title,
        price: product.unitPrice,
        image: product.image,
        rating: { rate: -1, count: -1 },
        description: "",
        category: "",
    };
    return (
        <div className="flex w-40 h-8 mx-8">
            <button
                onClick={() => removeProduct(productProp)}
                className="w-8 h-8 border-2 flex items-center justify-center text-xl hover:bg-slate-700"
            >
                -
            </button>
            <div className="grow h-8 border-y-2 flex items-center justify-center">
                {product.qty}
            </div>
            <button
                onClick={() => addProduct(productProp)}
                className="w-8 h-8 border-2 flex items-center justify-center text-xl hover:bg-slate-700"
            >
                +
            </button>
        </div>
    );
}
