import CartProduct from "../types/CartProduct";
import QuantityController from "./QuantityController";

interface IProps {
    product: CartProduct;
}

export default function CartProductTile({ product }: IProps) {
    return (
        <div className="flex flex-col lg:flex-row items-center my-6">
            <div className="bg-white w-80 h-80 lg:w-32 lg:h-32">
                <img
                    src={product.image}
                    alt={`image${product.productId}`}
                    className="w-80 h-80 lg:w-32 lg:h-32 object-contain"
                />
            </div>

            <h1 className="w-2/3 mt-2 lg:mx-8 text-lg lg:text-xl text-center lg:text-start">
                {product.title}
            </h1>
            <h1 className="w-40 mx-8 text-lg lg:text-xl text-center">
                ${product.unitPrice.toFixed(2)}
            </h1>
            {/* <h1 className="w-20 mx-4 text-xl text-center">{product.qty}</h1> */}
            <QuantityController product={product} />
            <h1 className="w-40 mx-8 text-3xl lg:text-xl font-semibold lg:font-normal text-center">
                ${product.totalPrice.toFixed(2)}
            </h1>
        </div>
    );
}
