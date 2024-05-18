import ProductCard, { Product } from "./ProductCard";

export default async function ProductsList() {
    const products: Product[] = await getProducts();
    console.log(products);
    return (
        <div className="bg-slate-900 px-32 py-16 border-red-200">
            <div className="grid grid-cols-3 gap-16 justify-items-center">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

async function getProducts() {
    const res = await fetch("https://fakestoreapi.com/products");

    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    return res.json();
}
