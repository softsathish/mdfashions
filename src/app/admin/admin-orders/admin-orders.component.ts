import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { links } from 'src/app/links';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  list: any = [];
  filter: any = {};
  statusList: any = [];
  constructor(private commonService: CommonService, private router: Router) { }

  ngOnInit(): void {
    this.getOrdersList();
    this.getFiltersList();
  }

  getOrdersList() {
    const url = links.admin_orders_view + '?';
    let filterStr = '';
    for (const prop in this.filter) {
      if (this.filter.hasOwnProperty(prop)) {
        const type = prop === 'statusID' ? 'eq' : 'cs';
        filterStr = filterStr + '&filter=' + prop + ',' + type + ',' + this.filter[prop];
      }
    }
    const order = '&order=id,desc';
    this.commonService.get(url + filterStr + order).subscribe(data => {
      this.list = data;
    });
  }

  getFiltersList() {
    this.commonService.get(links.order_statuses + '?order=name').subscribe(data => {
      this.statusList = data;
    });
    // this.commonService.get(links.order_statuses + '?order=name').subscribe(data => {
    //   this.statusList = data;
    // });
  }

  navigateToOrder(order) {
    this.router.navigate(['/order/' + order.id]);
  }

}
