import { Component, OnInit } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = true;
  private _listFilter: string;
  errorMessage: string;
  products : IProduct[] = [];   
  filterProducts: IProduct[] = this.products;

  constructor(private _productService: ProductService) { }

  ngOnInit() {
    this._productService
        .getProducts()
        .subscribe(
            (products) => {
                this.products = products;
                this.filterProducts = products;
            },
            error => this.errorMessage = <any>error
        );
  }

    toggleImage() {
        this.showImage = !this.showImage;
    }

    get listFilter() {
        return this._listFilter;
    }

    set listFilter(value: string) {
        this._listFilter = value;
        this.filterProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    performFilter(filterBy: string) :IProduct[]{
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) => 
            product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

}
