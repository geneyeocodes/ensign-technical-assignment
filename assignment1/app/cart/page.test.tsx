import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";

import CartButton from "../components/CartButton";
import CartCheckout from "./CartCheckout";
import Cart from "./Cart";
import Product from "../types/Product";

import AddToCartButton from "../product/[id]/AddToCartButton";
import CartProduct from "../types/CartProduct";
import QuantityController from "./QuantityController";

describe("Cart Page", () => {
    test("cart icon should have initial quantity of 0", async () => {
        render(<CartButton />);
        expect(
            await screen.findByRole("heading", { name: "0" })
        ).toBeInTheDocument();
    });

    test("cart should be empty initially", async () => {
        const { container } = render(<Cart />);
        expect(container.childElementCount).toEqual(0);
    });

    test("total amount should have initial value of $0.00", async () => {
        render(<CartCheckout />);
        expect(
            await screen.findByRole("heading", { name: "Total: $0.00" })
        ).toBeInTheDocument();
    });

    test("adding a new product to cart", async () => {
        render(<CartButton />);
        expect(
            await screen.findByRole("heading", { name: "0" })
        ).toBeInTheDocument();

        const testProduct1: Product = getTestProduct(1);
        render(<AddToCartButton product={testProduct1} />);
        fireEvent.click(
            await screen.findByRole("button", { name: "Add to Cart" })
        );

        expect(
            await screen.findByRole("heading", { name: "1" })
        ).toBeInTheDocument();

        const { container } = render(<Cart />);
        expect(container.childElementCount).toEqual(1);

        render(<CartCheckout />);
        expect(
            screen.queryByRole("heading", { name: "Total: $0.00" })
        ).toBeNull();
        expect(
            screen.queryByRole("heading", {
                name: `Total: $${testProduct1.price}`,
            })
        ).toBeInTheDocument();
    });

    test("adding different products to cart", async () => {
        // initial checking
        render(<CartButton />);
        expect(
            await screen.findByRole("heading", { name: "1" })
        ).toBeInTheDocument();

        const { container } = render(<Cart />);
        expect(container.childElementCount).toEqual(1);

        const testProduct1: Product = getTestProduct(1);
        render(<CartCheckout />);
        expect(
            screen.queryByRole("heading", {
                name: `Total: $${testProduct1.price}`,
            })
        ).toBeInTheDocument();

        // adding new products
        const testProduct2: Product = getTestProduct(2);
        const { rerender } = render(<AddToCartButton product={testProduct2} />);
        fireEvent.click(
            await screen.findByRole("button", { name: "Add to Cart" })
        );

        const testProduct3: Product = getTestProduct(3);
        rerender(<AddToCartButton product={testProduct3} />);
        fireEvent.click(
            await screen.findByRole("button", { name: "Add to Cart" })
        );

        // checking changes
        expect(
            await screen.findByRole("heading", { name: "3" })
        ).toBeInTheDocument();

        expect(container.childElementCount).toEqual(3);

        expect(
            screen.queryByRole("heading", {
                name: `Total: $${testProduct1.price}`,
            })
        ).toBeNull();
        expect(
            screen.queryByRole("heading", {
                name: `Total: $${
                    testProduct1.price + testProduct2.price + testProduct3.price
                }`,
            })
        ).toBeInTheDocument();
    });

    test("incrementing product quantities in cart", async () => {
        // initial checking
        render(<CartButton />);
        expect(
            await screen.findByRole("heading", { name: "3" })
        ).toBeInTheDocument();

        const testProduct1: Product = getTestProduct(1);
        const testProduct2: Product = getTestProduct(2);
        const testProduct3: Product = getTestProduct(3);
        render(<CartCheckout />);
        expect(
            screen.queryByRole("heading", {
                name: `Total: $${
                    testProduct1.price + testProduct2.price + testProduct3.price
                }`,
            })
        ).toBeInTheDocument();

        // incrementing products
        const { rerender } = render(
            <QuantityController
                product={convertToCartProduct(testProduct1, 1)}
            />
        );
        fireEvent.click(await screen.findByRole("button", { name: "+" }));
        fireEvent.click(await screen.findByRole("button", { name: "+" }));

        rerender(
            <QuantityController
                product={convertToCartProduct(testProduct3, 1)}
            />
        );
        fireEvent.click(await screen.findByRole("button", { name: "+" }));

        // checking changes
        expect(
            await screen.findByRole("heading", { name: "6" })
        ).toBeInTheDocument();

        const { container } = render(<Cart />);
        expect(container.childElementCount).toEqual(3);

        expect(
            await screen.findByRole("heading", {
                name: `Total: $${
                    3 * testProduct1.price +
                    testProduct2.price +
                    2 * testProduct3.price
                }`,
            })
        ).toBeInTheDocument();
    });

    test("decrementing product quantities in cart", async () => {
        // initial checking
        render(<CartButton />);
        expect(
            await screen.findByRole("heading", { name: "6" })
        ).toBeInTheDocument();

        const testProduct1: Product = getTestProduct(1);
        const testProduct2: Product = getTestProduct(2);
        const testProduct3: Product = getTestProduct(3);
        render(<CartCheckout />);
        expect(
            screen.queryByRole("heading", {
                name: `Total: $${
                    3 * testProduct1.price +
                    testProduct2.price +
                    2 * testProduct3.price
                }`,
            })
        ).toBeInTheDocument();

        // decrementing products
        render(
            <QuantityController
                product={convertToCartProduct(testProduct1, 3)}
            />
        );
        fireEvent.click(await screen.findByRole("button", { name: "-" }));

        // checking changes
        expect(
            await screen.findByRole("heading", { name: "5" })
        ).toBeInTheDocument();

        const { container } = render(<Cart />);
        expect(container.childElementCount).toEqual(3);

        expect(
            await screen.findByRole("heading", {
                name: `Total: $${
                    2 * testProduct1.price +
                    testProduct2.price +
                    2 * testProduct3.price
                }`,
            })
        ).toBeInTheDocument();
    });

    test("removing product from cart", async () => {
        // initial checking
        render(<CartButton />);
        expect(
            await screen.findByRole("heading", { name: "5" })
        ).toBeInTheDocument();

        const testProduct1: Product = getTestProduct(1);
        const testProduct2: Product = getTestProduct(2);
        const testProduct3: Product = getTestProduct(3);
        render(<CartCheckout />);
        expect(
            screen.queryByRole("heading", {
                name: `Total: $${
                    2 * testProduct1.price +
                    testProduct2.price +
                    2 * testProduct3.price
                }`,
            })
        ).toBeInTheDocument();

        // removing product
        render(
            <QuantityController
                product={convertToCartProduct(testProduct2, 1)}
            />
        );
        fireEvent.click(await screen.findByRole("button", { name: "-" }));

        // checking changes
        expect(
            await screen.findByRole("heading", { name: "4" })
        ).toBeInTheDocument();

        const { container } = render(<Cart />);
        expect(container.childElementCount).toEqual(2);

        expect(
            await screen.findByRole("heading", {
                name: `Total: $${
                    2 * testProduct1.price + 2 * testProduct3.price
                }`,
            })
        ).toBeInTheDocument();
    });

    test("clicking on the checkout button", async () => {
        const { container } = render(<Cart />);
        render(<CartCheckout />);

        expect(
            await screen.findByText(/^Total: \$(0|[1-9][0-9]*)\.[0-9]{2}$/)
        ).toBeInTheDocument();

        fireEvent.click(
            await screen.findByRole("button", { name: "Checkout" })
        );

        expect(container.childElementCount).toEqual(0);

        expect(
            await screen.findByRole("heading", { name: "Total: $0.00" })
        ).toBeInTheDocument();
    });
});

function getTestProduct(id: number): Product {
    const products: { [id: number]: Product } = {
        1: {
            id: 101,
            title: "Test Product 1",
            price: 179.99,
            description: "description for test product 1",
            category: "test",
            image: "https://picsum.photos/200",
            rating: { rate: 1.9, count: 42 },
        },
        2: {
            id: 102,
            title: "Test Product 2",
            price: 79.99,
            description: "description for test product 2",
            category: "test",
            image: "https://picsum.photos/200",
            rating: { rate: 4, count: 39 },
        },
        3: {
            id: 103,
            title: "Test Product 3",
            price: 379.99,
            description: "description for test product 3",
            category: "test",
            image: "https://picsum.photos/200",
            rating: { rate: 3.3, count: 132 },
        },
    };

    return products[id];
}

function convertToCartProduct(product: Product, qty: number): CartProduct {
    return {
        productId: product.id,
        title: product.title,
        unitPrice: product.price,
        image: product.image,
        qty: qty,
        totalPrice: qty * product.price,
    };
}
