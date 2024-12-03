import { Component, OnInit } from '@angular/core';
import { finalize, map, Observable } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { productsService } from 'src/app/Services/product.service';
import { tap } from 'rxjs/operators';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class productsListComponent implements OnInit {
  products: { [category: string]: any[] } = {
    "men's clothing": [],
    "women's clothing": [],
    jewelery: [],
    electronics: [],
  };
  upcoming: Product[] = [];

  displayCreateDialog: boolean = false;
  // imagePrefix: string = "https://image.tmdb.org/t/p/w500/"
  loadingIndicator: boolean = true;
  cartCount:number= 0

  constructor(private productsService: productsService, private datePipe: DatePipe) {
    this.productsService.favourites = JSON.parse(localStorage.getItem('favourites') || '[]');
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartCount = cart.length;
    this.getAllProducts()
  }


  getAllProducts(): void {
    this.productsService.getUpcomingProducts().pipe(

      finalize(() => {
        this.loadingIndicator = false;
            })
    ).subscribe((data: any) => {
      data.forEach((product: any) => {
        if (this.products[product.category]) {
          this.products[product.category].push(product);
        }
      });
      this.upcoming = data?.results?.map((movie: any) => {
        let found: boolean = false;
        this.productsService.favourites.forEach((fav: any) => {
          if (movie.id === fav.id) {
            found = true;
          }
        });
        return this.mappedObject(movie, found)
      });
    });
  }

 

  mappedObject(movie: any, found: boolean) {
    return {
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      // poster: this.imagePrefix + movie?.poster_path,
      vote_average: movie.vote_average,
      vote_count: movie.vote_count,
      release_date: movie.release_date,
      isFafourite: found
    };
  }


  openCreateDialog() {
    this.displayCreateDialog = true
  }



  close(flag: boolean) {
    this.displayCreateDialog = flag
  }

  ngOnInit(): void {
  }

}
