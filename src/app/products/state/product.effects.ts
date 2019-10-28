import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import * as productActions from './product.actions';
import { Product } from '../product';
import { mergeMap, map } from 'rxjs/operators';

@Injectable()
export class ProductEffects {
    constructor(private actions$: Actions, private productService: ProductService) { }

    loadProducts = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.Load),
        mergeMap((action: productActions.Load) => this.productService.getProducts().pipe(
            map((products: Product[]) => (new productActions.LoadSuccess(products)))
        ))
    );
}
