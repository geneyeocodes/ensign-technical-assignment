"use client";
import { useCartStore } from "../stores/CartStore";

export default function CartCheckout() {
    const { totalAmt, clearCart } = useCartStore();
    return (
        <footer className="flex flex-col lg:flex-row justify-end items-start lg:items-center bg-cyan-600">
            <h1 className="font-medium text-4xl mx-8 sm:mr-16 my-4">
                Total: ${totalAmt.toFixed(2)}
            </h1>
            <button
                onClick={clearCart}
                className="text-2xl font-medium rounded-xl h-14 px-24 lg:px-10 ml-8 xl:mr-10 2xl:mr-64 mb-2 lg:my-4 bg-green-800 hover:bg-green-700"
            >
                Checkout
            </button>
        </footer>
    );
}
