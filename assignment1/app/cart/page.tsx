import Header from "@/app/components/Header";
import Cart from "./Cart";
import CartCheckout from "./CartCheckout";

export default function CartPage() {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="grow bg-slate-900 py-12 px-12 xl:px-64">
                <h1 className="text-4xl font-bold">Shopping Cart</h1>
                <div className="flex items-center mt-12 font-medium">
                    <h1 className="w-32">Product</h1>
                    <h1 className="w-2/3 mx-8"></h1>
                    <h1 className="w-40 mx-8 text-center">Unit Price</h1>
                    <h1 className="w-40 mx-8 text-center">Quantity</h1>
                    <h1 className="w-40 mx-8 text-center">Total Price</h1>
                </div>
                <div className="mt-4">
                    <Cart />
                </div>
            </div>
            <CartCheckout />
        </div>
    );
}
