import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Product } from 'src/app/interfaces/product';
import { CoutnCardService } from 'src/app/Services/coutn-card.service';
import { productsService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product:any
  flag:any
  isLoading:boolean =false
  constructor(private router: Router,private _productsService:productsService,private cartService:CoutnCardService,private messageService:MessageService) {
    const navigation = this.router.getCurrentNavigation();
    this.product = navigation?.extras.state?.['product'];
  }

  ngOnInit(): void {
    const productData = localStorage.getItem('selectedProduct');
    if (productData) {
      this.product = JSON.parse(productData); 
    }
    this.flag = this.product.isFafourite

  }

  getStarsArray(rating: { rate: number }): number[] {
    return Array(Math.round(rating.rate)).fill(1);
  }
  addToFavourites(product: Product): void {
    this.isLoading = true;
  
    this._productsService.favourites = JSON.parse(localStorage.getItem('favourites') || '[]');
  
    product.isFavourite = !product.isFavourite;
    this.flag = product.isFavourite;
  
    if (product.isFavourite) {
      this._productsService.favourites.push(product);
      this.cartService.addToCart(product)
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'This product is added to your favourites list',
      });
    } else if (this.product.isFafourite) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Removed',
        detail: 'This product is removed from your favourites list',
      });
      this._productsService.favourites = this._productsService.favourites.filter(
        (fav: Product) => fav.id !== product.id
      );
     
    }
  
    localStorage.setItem('favourites', JSON.stringify(this._productsService.favourites));
  
    this.isLoading = false;
  }
  
  addToCart(product: Product): void {
    this.isLoading = true;
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartService.addToCart(product);

    this.messageService.add({
      severity: 'success',
      summary: 'Added to Cart',
      detail: `${product.title} has been added to your cart.`,
    });

    const cartCount = cart.length;

    this.isLoading = false;
  }

}
