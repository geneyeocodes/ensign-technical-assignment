"use client";
import { CartProduct, useCartStore } from "../stores/CartStore";

export default function Cart() {
    const { totalQty, totalAmt, products } = useCartStore();
    return (
        <div>
            <h1>hello</h1>
            <h1>{totalQty}</h1>
            <h1>{totalAmt}</h1>
            <h1>{JSON.stringify(products)}</h1>
        </div>
    );
}
