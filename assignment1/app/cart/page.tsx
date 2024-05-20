import Header from "@/app/components/Header";
import Cart from "./Cart";
import CartCheckout from "./CartCheckout";

export default function CartPage() {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <Cart />
            <CartCheckout />
        </div>
    );
}
