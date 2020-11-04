import { Component, OnInit } from '@angular/core';
import { links } from 'src/app/links';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {

  orderComp: any = {};
  order: any = {};
  selectedCustomer: any = {};
  customers: any = [];
  productsList: any = [];

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
  }

  searchCustomer(event) {
    this.commonService.get(links.users + '?filter1=name,cs,' + event.target.value +
      '&filter2=mobile,cs,' + event.target.value + '&page=1,10').subscribe(data => {
        this.customers = data;
      });
  }

  selectCustomer(cust) {
    this.order.userID = cust.id;
    this.selectedCustomer = cust;
    this.customers = [];
    this.orderComp.customerTxt = '';
  }

  searchProduct(event) {
    this.commonService.get(links.products + '?filter1=title,cs,' + event.target.value
       + '&page=1,10').subscribe(data => {
      this.productsList = data;
    });
  }

}
