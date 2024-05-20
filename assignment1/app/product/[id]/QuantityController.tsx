import { useCartStore } from "@/app/stores/CartStore";
import Product from "@/app/types/Product";

interface IProps {
    product: Product;
    qty: number;
}

export default function QuantityController({ product, qty }: IProps) {
    const { removeProduct, addProduct } = useCartStore();
    return (
        <div className="flex mt-4">
            <button
                onClick={() => removeProduct(product)}
                className="w-12 h-12 border-2 flex items-center justify-center text-3xl hover:bg-slate-700"
            >
                -
            </button>
            <div className="grow w-20 h-12 border-y-2 flex items-center justify-center text-2xl">
                {qty}
            </div>
            <button
                onClick={() => addProduct(product)}
                className="w-12 h-12 border-2 flex items-center justify-center text-3xl hover:bg-slate-700"
            >
                +
            </button>
        </div>
    );
}
