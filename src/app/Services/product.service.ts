import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class productsService {

  SERVER_URL: string = environment.baseUrl;
  favourites: Product[] = [];

  constructor(private _http: HttpClient) { }

  getUpcomingProducts(): Observable<any> {
    return this._http.get(`${this.SERVER_URL}`);
  }
  getProductDetails(id:number){
    return this._http.get(`${this.SERVER_URL}/${id}`);

  }


}
