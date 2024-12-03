import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoutnCardService {

  private cart = JSON.parse(localStorage.getItem('cart') || '[]');
  private cartCountSubject = new BehaviorSubject<number>(this.cart.length);

  constructor() {}

  get cartCount() {
    return this.cartCountSubject.asObservable();
  }

  addToCart(product: any): void {
    this.cart.push(product);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.cartCountSubject.next(this.cart.length); 
  }

  removeFromCart(productId: any): void {
    this.cart = this.cart.filter((item: any) => item.id !== productId); 
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.cartCountSubject.next(this.cart.length); 
  }
}
