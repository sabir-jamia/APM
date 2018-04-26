import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { ProductListComponent } from './product-list.component';
import { ConvertToSpacesPipe } from './convert-to-spaces.pipe';
import { ProductService } from './product.service';
import { ProductDetailComponent } from './product-detail.component';
import { ProductGuard } from './product.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      {path: 'products', component: ProductListComponent},
      {
        path: 'products/:id', 
        canActivate: [ ProductGuard ],
        component: ProductDetailComponent
      }
    ]),
    SharedModule
  ],
  declarations: [
    ProductListComponent,
    ConvertToSpacesPipe,
    ProductDetailComponent
  ],
  providers: [
    ProductService,
    ProductGuard
  ]
})
export class ProductModule { }
