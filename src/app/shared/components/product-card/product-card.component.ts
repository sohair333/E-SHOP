import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Product } from 'src/app/interfaces/product';
import { productsService } from 'src/app/Services/product.service';
import { ActivatedRoute, Router } from '@angular/router'; 
import { CoutnCardService } from 'src/app/Services/coutn-card.service';
@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class MoviesCardComponent implements OnInit {

  @Input() product: any
  isLoading: boolean = false
  flag: boolean = false

  constructor(private messageService: MessageService, private _productsService: productsService,  private router: Router,
    private activatedRoute: ActivatedRoute ,private cartService:CoutnCardService) { }

  ngOnInit(): void {
    if (this.router.url.includes('/favourites')) {
      this.product.isFafourite = true
    }else{
      this.product.isFafourite = false

    }
    if(this.router.url.includes('/cart')){
      this.product.cart = true
    }else{
      this.product.cart = false

    }
    this.flag = this.product.isFafourite
  }
  getRatingArray(rate: number): number[] {
    return Array(Math.round(rate)).fill(0);
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
