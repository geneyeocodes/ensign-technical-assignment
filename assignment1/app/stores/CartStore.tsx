import { create } from "zustand";
import { persist } from "zustand/middleware";
import Product from "../types/Product";
import CartProduct from "../types/CartProduct";

type CartStore = {
    totalQty: number;
    totalAmt: number;
    products: { [productId: string]: CartProduct };
    addProduct: (product: Product) => void;
    removeProduct: (product: Product) => void;
    clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
    persist(
        (set) => ({
            totalQty: 0,
            totalAmt: 0,
            products: {},
            addProduct: (product: Product) =>
                set((state) => ({
                    totalQty: state.totalQty + 1,
                    totalAmt: state.totalAmt + product.price,
                    products: state.products.hasOwnProperty(product.id)
                        ? {
                              ...state.products,
                              [product.id]: {
                                  ...state.products[product.id],
                                  qty: state.products[product.id].qty + 1,
                                  totalPrice:
                                      state.products[product.id].totalPrice +
                                      product.price,
                              },
                          }
                        : {
                              ...state.products,
                              [product.id]: {
                                  productId: product.id,
                                  title: product.title,
                                  unitPrice: product.price,
                                  image: product.image,
                                  qty: 1,
                                  totalPrice: product.price,
                              },
                          },
                })),
            removeProduct: (product: Product) =>
                set((state) => ({
                    totalQty: state.totalQty - 1,
                    totalAmt: Math.max(0, state.totalAmt - product.price),
                    products:
                        state.products[product.id].qty == 1
                            ? {
                                  ...state.products,
                                  [product.id]: undefined,
                              }
                            : {
                                  ...state.products,
                                  [product.id]: {
                                      ...state.products[product.id],
                                      qty: state.products[product.id].qty - 1,
                                      totalPrice:
                                          state.products[product.id]
                                              .totalPrice - product.price,
                                  },
                              },
                })),
            clearCart: () =>
                set((state) => ({ totalQty: 0, totalAmt: 0, products: {} })),
        }),
        { name: "cartStore", skipHydration: true }
    )
);
