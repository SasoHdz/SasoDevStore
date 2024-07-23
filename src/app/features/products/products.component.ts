import { Component, inject } from '@angular/core';
import { CardComponent } from './card/card.component';
import { ProductsService } from '@api/products.service';
import { CartStore } from '@shared/shopping-cart.store';
import { Product } from '@shared/models/product.interface';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export default class ProductsComponent {
  private readonly productSvc = inject(ProductsService);
  products = this.productSvc.products;

  cartStore = inject(CartStore);

  onAddToCart(product: Product): void{
    this.cartStore.addToCart(product);
  }
}
