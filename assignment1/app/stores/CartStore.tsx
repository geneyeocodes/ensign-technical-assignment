import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartProduct = {
    productId: number;
    qty: number;
    totalPrice: number;
};

type CartStore = {
    totalQty: number;
    totalAmt: number;
    products: { [productId: string]: CartProduct };
    addProduct: (productId: number, unitPrice: number) => void;
    removeProduct: (productId: number, unitPrice: number) => void;
    clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
    persist(
        (set) => ({
            totalQty: 0,
            totalAmt: 0,
            products: {},
            addProduct: (productId: number, unitPrice: number) =>
                set((state) => ({
                    totalQty: state.totalQty + 1,
                    totalAmt: state.totalAmt + unitPrice,
                    products: state.products.hasOwnProperty(productId)
                        ? {
                              ...state.products,
                              [productId]: {
                                  ...state.products[productId],
                                  qty: state.products[productId].qty + 1,
                                  totalPrice:
                                      state.products[productId].totalPrice +
                                      unitPrice,
                              },
                          }
                        : {
                              ...state.products,
                              [productId]: {
                                  productId: productId,
                                  qty: 1,
                                  totalPrice: unitPrice,
                              },
                          },
                })),
            removeProduct: (productId: number, unitPrice: number) =>
                set((state) => ({
                    totalQty: state.totalQty - 1,
                    totalAmt: state.totalAmt - unitPrice,
                    products:
                        state.products[productId].qty == 1
                            ? () => {
                                  delete state.products[productId];
                                  return state.products;
                              }
                            : {
                                  ...state.products,
                                  [productId]: {
                                      ...state.products[productId],
                                      qty: state.products[productId].qty - 1,
                                      totalPrice:
                                          state.products[productId].totalPrice -
                                          unitPrice,
                                  },
                              },
                })),
            clearCart: () =>
                set((state) => ({ totalQty: 0, totalAmt: 0, products: {} })),
        }),
        { name: "cartStore" }
    )
);
