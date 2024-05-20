"use client";
import { useCartStore } from "../stores/CartStore";

export default function CartCheckout() {
    const { totalAmt, clearCart } = useCartStore();
    return (
        <footer className="flex justify-end items-center bg-cyan-600">
            <h1 className="font-medium text-4xl mr-32 my-6">
                Total: ${totalAmt.toFixed(2)}
            </h1>
            <button
                onClick={clearCart}
                className="text-2xl font-medium rounded-xl h-14 px-4 mr-20 bg-green-800 hover:bg-green-700"
            >
                Checkout
            </button>
        </footer>
    );
}
