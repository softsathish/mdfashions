import { Component, OnInit } from '@angular/core';
import { links } from 'src/app/links';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  homeCategoies: any = [];
  topOrders: any = [];
  topOrdersTotal: number;

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.getCategories();
    // this.getTopOrders();
  }

  getCategories() {
    this.commonService.get(links.categories_products_count_view +
      '?order=productCount,desc&order=offerPrice,desc&page=1,8').subscribe(data => {
      this.homeCategoies = data;
    });
  }
  escapeChars(text) {
    return decodeURIComponent(text);
  }

  urlTitle(name) {
    return this.commonService.urlTitle(name);
  }

  productURL(id, name) {
    return this.commonService.productURL(id, name);
  }

  getTopOrders() {
    const url = links.categories_products_view + '?order=orderCnt,desc&page=1,4&filter=orderCnt,neq,0';
    this.commonService.get(url).subscribe(data => {
      this.topOrders = data;
      this.topOrdersTotal = this.commonService.totalRecords[url];
    });
  }

}
