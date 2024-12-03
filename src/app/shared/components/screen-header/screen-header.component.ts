import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CoutnCardService } from 'src/app/Services/coutn-card.service';

@Component({
  selector: 'app-screen-header',
  templateUrl: './screen-header.component.html',
  styleUrls: ['./screen-header.component.scss']
})
export class ScreenHeaderComponent implements OnInit {

  @Output() CreateHandler: EventEmitter<boolean> = new EventEmitter();
  @Input() buttonStyle = 1 || 2;
  @Input() firstLetter = ''
  @Input() title = ''
  @Input() show: boolean = true;
  cartCount: number = 0;

  constructor(private cartService:CoutnCardService,private router:Router) { }

  ngOnInit(): void {

    this.cartService.cartCount.subscribe(count => {
      this.cartCount = count; 
    });
  }

  openDialog() {
    this.CreateHandler.emit();
  }

  openCartDialog() {
      this.router.navigate(['/cart'])
    console.log('Cart Dialog Opened');
  }

  addToCart(product: any) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartCount = cart.length;
  }
  updateCartCount(): void {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartCount = cart.length;
  }
  navigateTOHome(){
    this.router.navigate(['']);
  }
}
