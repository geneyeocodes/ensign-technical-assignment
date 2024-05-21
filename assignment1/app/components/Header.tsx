import Link from "next/link";
import CartButton from "./CartButton";

export default function Header() {
    return (
        <div className="flex items-center justify-between bg-cyan-600">
            <Link href="/">
                <h1 className="font-extrabold text-4xl xl:text-5xl font-outline-1 ml-10 my-4 hover:text-gray-300">
                    GY SHOP
                </h1>
            </Link>
            <CartButton />
        </div>
    );
}
