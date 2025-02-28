import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Product } from "@shared/models/product.interface";
import { environment } from "environments/environment.development";
import { map } from "rxjs";
import { loadStripe } from '@stripe/stripe-js';

@Injectable({ providedIn: 'root'})
export class CheckoutService {
  private readonly _http = inject(HttpClient)
  private readonly _url = environment.serverURL;
 onProceedToPay(products: Product[]): any {
  return this._http.post(`${this._url}/checkout`, {items: products})
    .pipe(
      map(async (res: any) => {
        const stripe = await loadStripe(environment.stripeAPIKey);
        stripe?.redirectToCheckout({ sessionId: res.id})
      })
    ).subscribe({
      error: (err) => console.error('Error', err),
    });
 }
}


