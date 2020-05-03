import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit,OnDestroy {
  product;
  filterProducts:any[];
  subscription:Subscription;
  

  constructor(private productService:ProductService) {
   this.subscription=this.productService.getAll().subscribe(p=>this.filterProducts=this.product=p);  
   }

   filter(query:string){
     this.filterProducts=(query)?
     this.product.filter(p=>p.title.toLowerCase().includes(query.toLowerCase())):
     this.product;
    
   }
  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
