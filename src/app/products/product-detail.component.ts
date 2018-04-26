import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './product.service';
import { IProduct } from './product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: []
})
export class ProductDetailComponent implements OnInit {
  
  pageTitle: string= 'Product Detail';
  product: IProduct; 
  errMessage: string;
  
  constructor(
    private _route: ActivatedRoute, 
    private _productService: ProductService,
    private _router: Router
  ) { }
  
  ngOnInit() {
    const param = this._route.snapshot.paramMap.get('id');
    if(param) {
      const id = +param;
      this.getProduct(id); 
    }
  }

  getProduct(id: number) {
    this._productService
      .getProduct(id)
      .subscribe(
        (product: IProduct) => this.product = product,
        err => this.errMessage = <any>err
      )
  }

  onBack() {
    this._router.navigate(['/products']);
  }
}
