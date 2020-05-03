import { Product } from '../../models/product';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/take';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  category$;
  product:any={};
  id;

  constructor(categoryService:CategoryService,private productServive:ProductService,private router:Router,private route:ActivatedRoute) {
    this.category$=categoryService.getCategories();
    this.id=this.route.snapshot.paramMap.get('id');
    if(this.id) this.productServive.get(this.id).take(1).subscribe(p=>{
      this.product=p
    });
    console.log(this.product);
   }

   save(product){
     if(this.id) this.productServive.update(this.id,product);
     else this.productServive.create(product);
     this.router.navigate(['/admin/products']);
   }

   delete(){
     if(!confirm("Are you sure to delete this product?")) return;

     this.productServive.delete(this.id);
     this.router.navigate(['/admin/products']); 
   }

  ngOnInit(): void {  
  }

}
