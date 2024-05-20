"use client";

import { useCartStore } from "@/app/stores/CartStore";
import Product from "@/app/types/Product";
import AddToCartButton from "./AddToCartButton";
import QuantityController from "./QuantityController";

interface IProps {
    product: Product;
}

export default function AddToCart({ product }: IProps) {
    const { products } = useCartStore();

    return products.hasOwnProperty(product.id) ? (
        <QuantityController product={product} qty={products[product.id].qty} />
    ) : (
        <AddToCartButton product={product} />
    );
}
