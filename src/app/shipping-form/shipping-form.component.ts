import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';
import { Order } from '../models/order';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit,OnDestroy {
  @Input('cart') cart;
  shipping:any={}; 
  userId:string;
  subscription:Subscription;

  constructor(
    private orderService:OrderService,
    private authService:AuthService,
    private router:Router) { }

  ngOnInit() {
    this.subscription=this.authService.user$.subscribe(user=>this.userId=user.uid);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async placeOrder() {
    let order=new Order(this.userId,this.shipping,this.cart);
    let result=await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }   


}
