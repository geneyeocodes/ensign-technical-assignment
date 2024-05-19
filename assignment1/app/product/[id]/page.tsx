import Header from "@/app/components/Header";
import Product from "@/app/types/Product";
import AddToCartButton from "./AddToCartButton";

export default async function ProductPage({
    params,
}: {
    params: { id: number };
}) {
    const product: Product = await getProductData(params.id);
    console.log(product);

    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="grow bg-slate-900 py-12 px-64 flex flex-col items-center">
                <img
                    src={product.image}
                    className="max-h-[26rem] object-contain"
                />
                <h1 className="text-3xl font-semibold text-center mt-6">
                    {product.title}
                </h1>
                <div className="flex items-center mt-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="#ffe234"
                        className="w-6 h-6 mx-2"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                            clip-rule="evenodd"
                        />
                    </svg>

                    <h1>
                        {product.rating.rate} out of 5 | {product.rating.count}{" "}
                        Ratings
                    </h1>
                </div>
                <h1 className="text-lg text-center mt-4">
                    {product.description}
                </h1>
                <h1 className="text-4xl mt-8">${product.price}</h1>
                <AddToCartButton product={product} />
            </div>
        </div>
    );
}

async function getProductData(id: number) {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);

    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    return res.json();
}
