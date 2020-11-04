import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { links } from 'src/app/links';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  user: any = {};
  orders: any = [];
  constructor(private commonService: CommonService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.commonService.getUser();
    if (!this.user.id) {
      this.router.navigate(['login-register']);
    }
    this.getList();
  }

  getList() {
    console.log(this.user);
    const userFilter = this.user.type !== '0' ? '&filter=userID,eq,' + this.user.id : '';
    this.commonService.get(links.order + '?join=order_status,order_statuses&join=order_products,products,product_images&order=id,desc' + userFilter).subscribe(data => {
      this.orders = data;
    });
  }

  escapeChars(text) {
    return decodeURIComponent(text);
  }

  navigateToOrder(order) {
    this.router.navigate(['/order/' + order.id]);
  }

  getOrderTotal(products) {
    const sum = products
      .map(item => parseFloat(item.price))
      .reduce((prev, curr) => prev + curr, 0);
    return parseFloat(sum).toFixed(2);
  }

}
