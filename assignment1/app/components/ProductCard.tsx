import Image from "next/image";

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

interface IProps {
    product: Product;
}

export default function ProductCard({ product }: IProps) {
    return (
        <div className="w-96 h-80 bg-white rounded-3xl flex flex-col items-center border-4 hover:border-red-500">
            <img
                className="grow h-px object-scale-down py-2"
                src={product.image}
            />
            <h1 className="flex items-end px-4 text-center text-black font-semibold py-4">
                {product.title}
            </h1>
            <h1 className="flex-none text-center text-lg text-black font-bold pb-2">
                ${product.price}
            </h1>
        </div>
    );
}
