import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { links } from 'src/app/links';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  order: any;
  user: any;
  tempStatus: string;
  comments: string;
  statuses: any = [];
  constructor(private commonService: CommonService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.user =  this.commonService.getUser();
    this.getOrderDetails();
    this.getStatusesList();
  }

  getOrderDetails() {
    this.route.params.subscribe(params => {
      this.commonService.get(links.order + '?join=order_status,order_statuses&join=order_products,products,product_images&filter=id,eq,' + params.id).subscribe(data => {
        this.order = data[0];
        this.tempStatus = '' + this.order.order_status[this.order.order_status.length - 1].statusID.id;
        this.comments = this.order.order_status[this.order.order_status.length - 1].comments;
      });
    });
  }

  getStatusesList() {
    this.commonService.get(links.order_statuses).subscribe(data => {
      this.statuses = data;
    });
  }

  productURL(id, name) {
    return this.commonService.productURL(id, name);
  }

  escapeChars(text) {
    return decodeURIComponent(text);
  }

  updateProduct(product) {
    this.commonService.get(links.order_products + '/' + product.id).subscribe(data => {
      data.price = product.price;
      data.bprice = product.bprice;
      this.commonService.put(links.order_products + '/' + data.id, data).subscribe(() => {
        this.getOrderDetails();
      });
    });
  }

  updateStatus() {
    const orderStatus = {orderID: this.order.id, statusID: this.tempStatus, comments: this.comments};
    this.commonService.post(links.order_status, orderStatus).subscribe(() => {
      this.getOrderDetails();
    });
  }

}
