import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { productsService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {

  favouriteList: Product[] = []
  imagePrefix: string = "https://image.tmdb.org/t/p/w500/"

  constructor(public _productsService: productsService) {
    this._productsService.favourites = JSON.parse(localStorage.getItem('favourites') || '[]');
  }

  ngOnInit(): void {
  }

}
