import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, Output, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@shared/models/product.interface';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  product = input.required<Product>();
  @Output() addToCartEvent = new EventEmitter<Product>();
  onAddToCart():void{
    this.addToCartEvent.emit(this.product());
  }
}
