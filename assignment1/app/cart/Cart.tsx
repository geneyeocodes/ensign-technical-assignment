"use client";
import { useCartStore } from "../stores/CartStore";
import CartProduct from "../types/CartProduct";
import CartProductCard from "./CartProductTile";

export default function Cart() {
    const { products } = useCartStore();

    return Object.values(products).map((product: CartProduct) =>
        product == undefined ? undefined : (
            <CartProductCard key={product.productId} product={product} />
        )
    );
}
