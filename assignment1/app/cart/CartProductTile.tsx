import CartProduct from "../types/CartProduct";
import QuantityController from "./QuantityController";

interface IProps {
    product: CartProduct;
}

export default function CartProductTile({ product }: IProps) {
    return (
        <div className="flex items-center my-6">
            <div className="bg-white">
                <img
                    src={product.image}
                    alt={`image${product.productId}`}
                    className="w-32 h-32 object-contain"
                />
            </div>

            <h1 className="w-2/3 mx-8 text-xl">{product.title}</h1>
            <h1 className="w-40 mx-8 text-xl text-center">
                ${product.unitPrice.toFixed(2)}
            </h1>
            {/* <h1 className="w-20 mx-4 text-xl text-center">{product.qty}</h1> */}
            <QuantityController product={product} />
            <h1 className="w-40 mx-8 text-xl text-center">
                ${product.totalPrice.toFixed(2)}
            </h1>
        </div>
    );
}
