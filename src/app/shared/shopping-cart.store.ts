import { computed, inject } from '@angular/core';
import { Product } from './models/product.interface';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { ToastrService } from 'ngx-toastr';

export interface CartStore {
  products: Product[];
  totalAmount: number;
  productsCount: number;
}

const initialState: CartStore = {
  products: [],
  totalAmount: 0,
  productsCount: 0,
};

export const CartStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ products }) => ({
    productsCount: computed(() => calculateProductCount(products())),
    totalAmount: computed(() =>  calculateTotalAmount(products())),
  })),
  withMethods(({ products, ...store }, toastSvc = inject(ToastrService)) => ({
    addToCart(product: Product) {
      const isProductyInCart = products().find(
        (item: Product) => item.id == product.id
      );

      if (isProductyInCart) {
        isProductyInCart.qty++;
        isProductyInCart.subTotal =
          isProductyInCart.qty * isProductyInCart.price;
        patchState(store, { products: [...products()] });
      } else {
        patchState(store, { products: [...products(), product] });
      }

      toastSvc.success('Product added', 'PDX STORE');
    },
    removeFromCart(id: number) {
      const updatedProducts = products().filter((product) => product.id != id);
      patchState(store, { products: updatedProducts });
      toastSvc.info('Product removed', 'PDX STORE');
    },
    clearCart() {
      patchState(store, initialState);
      toastSvc.info('Cart cleared', 'PDX STORE');
    },
  }))
);

function calculateTotalAmount(products: Product[]): number {
  return products.reduce((acc, product) => acc + product.price * product.qty, 0);
}

function calculateProductCount(products: Product[]): number {
  return products.reduce((acc, product) => acc + product.qty, 0);
}
