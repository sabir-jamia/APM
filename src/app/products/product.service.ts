import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IProduct } from './product';
import { throwError, Observable } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';


@Injectable()
export class ProductService {
  private _productUrl = './api/products/product.json';

  constructor(private _http: HttpClient) { }

  getProducts() : Observable<IProduct[]> {
    return this._http.get<IProduct[]>(this._productUrl)
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getProduct(id: number) : Observable<IProduct>{
    return this.getProducts()
      .pipe(
        map((products: IProduct[]) => products.find(p => p.productId === id)),
        tap(data => console.log('One Product: ' + JSON.stringify(data)))
      );
  }

  private handleError(err: HttpErrorResponse) {
    let errMessage = '';
    if(err.error instanceof Error) {
      errMessage = `An error occurred: ${err.error.message}`;
    } else {
      errMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errMessage);
    return throwError(errMessage);
  }

  
}