import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoutnCardService } from 'src/app/Services/coutn-card.service';
import { productsService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems:any[]=[]
  totalPrice:number= 0
  constructor(private cartService:CoutnCardService,private router:Router,private _productsService:productsService) { }

  ngOnInit(): void {
    this.loadCartItems();
    this.calculateTotalPrice();
  }
  navigateToDetails(productId: number,product:any) {
    localStorage.setItem('selectedProduct', JSON.stringify(product));

    this._productsService.getProductDetails(productId).subscribe(
      (productDetails: any) => {
        this.router.navigate(['/PorductItem'], { state: { product: productDetails } });
      },
      (error) => {
        console.error('Error fetching product details', error);
      }
    );
  }
  loadCartItems(): void {
    this.cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId); 
    this.loadCartItems();
    this.calculateTotalPrice();
 
  }
  getRatingArray(rate: number): number[] {
    return Array(Math.round(rate)).fill(0);
  }
  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }

  openCreateDialog(){}
}
