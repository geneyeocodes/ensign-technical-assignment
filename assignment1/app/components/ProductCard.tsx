import Link from "next/link";
import Product from "../types/Product";

interface IProps {
    product: Product;
}

export default function ProductCard({ product }: IProps) {
    // console.log(product);
    return (
        <Link href={`/product/${product.id}`}>
            <div className="w-96 h-80 bg-white rounded-3xl flex flex-col items-center border-4 hover:border-red-500">
                <img
                    className="grow h-px object-contain py-2"
                    src={product.image}
                />
                <h1 className="flex items-end px-4 text-center text-black font-semibold py-4">
                    {product.title}
                </h1>
                <h1 className="flex-none text-center text-lg text-black font-bold pb-2">
                    ${product.price}
                </h1>
            </div>
        </Link>
    );
}
