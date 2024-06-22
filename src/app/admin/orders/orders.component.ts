import { Component, OnInit } from '@angular/core';
import { order } from 'src/app/Modal/interfaces/order.interface';
import { SiteOrdersService } from 'src/app/services/site-orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: order[] = [];

  constructor(private orderServ: SiteOrdersService) { }

  ngOnInit() {
    this.orderServ.getSiteOrder().subscribe(data => {
      for (const key in data) {
        this.orders.push(data[key])
      }
      this.orders.reverse()
    })
  }

  del(order:order){
    this.orderServ.deleteSiteOrder(order)
  }
}
