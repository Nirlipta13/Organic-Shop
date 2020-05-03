import { OrderService } from './../order.service';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  order$;

  constructor(private auth:AuthService,private orderService:OrderService) { 
    this.order$=auth.user$.switchMap(u=>orderService.getOderByUser(u.uid));
  }

  ngOnInit(): void {
  }

}
