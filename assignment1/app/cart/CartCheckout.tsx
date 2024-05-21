"use client";
import { useCartStore } from "../stores/CartStore";

export default function CartCheckout() {
    const { totalAmt, clearCart } = useCartStore();
    return (
        <footer className="flex flex-col lg:flex-row justify-end items-start lg:items-center bg-cyan-600">
            <h1 className="font-medium text-3xl lg:text-4xl mx-8 sm:mr-16 my-4">
                Total: ${totalAmt.toFixed(2)}
            </h1>
            <button
                onClick={clearCart}
                className="text-2xl font-medium rounded-xl w-5/6 lg:w-40 py-2 lg:py-4 ml-8 mr-12 2xl:mr-64 mb-2 lg:my-4 bg-green-800 hover:bg-green-700"
            >
                Checkout
            </button>
        </footer>
    );
}
