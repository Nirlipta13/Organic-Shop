import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { Product } from '../models/product';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  products:any={};
  category:string; 
  filterProducts:Product[]=[];
  cart$:Observable<ShoppingCart>;
  
  constructor(
    private route:ActivatedRoute,
    private productService:ProductService,
    private shoppingCartService:ShoppingCartService) {
   }

  async ngOnInit() {
    this.cart$=(await this.shoppingCartService.getCart());
    this.populateProducts();
  }

  private populateProducts(){
    this.productService
    .getAll()
    .switchMap(products=>{
      this.products=products;
      return this.route.queryParamMap;
    })
    .subscribe(params=>{
      this.category=params.get('category');
      this.applyFilter();
    });
  }

  private applyFilter(){
    this.filterProducts=(this.category)?
        this.products.filter(p=>p.category===this.category):
        this.products;
  }

}
