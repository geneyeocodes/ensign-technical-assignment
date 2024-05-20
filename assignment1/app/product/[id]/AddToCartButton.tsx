"use client";
import { useCartStore } from "@/app/stores/CartStore";
import Product from "@/app/types/Product";

interface IProps {
    product: Product;
}

export default function AddToCartButton({ product }: IProps) {
    const { addProduct } = useCartStore();

    return (
        <button
            onClick={() => addProduct(product)}
            className="text-2xl font-semibold rounded-xl mt-4 py-3 px-8 bg-cyan-600 hover:bg-cyan-700"
        >
            Add to Cart
        </button>
    );
}
