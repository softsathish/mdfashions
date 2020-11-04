import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { links } from 'src/app/links';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart: any = [];
  checkout: any = {name: '', discount: 0, userID: 0};
  user: any;
  mobNumberPattern = '^((\\+91-?)|0)?[0-9]{10}$';
  isValidFormSubmitted = false;

  constructor(public commonService: CommonService, private router: Router) { }

  ngOnInit(): void {
    this.cart = this.commonService.cart;
    this.checkUser();
    this.checkout.total = 0;
    this.cart.forEach(element => {
      this.checkout.total = this.checkout.total + (parseFloat(element.offerPrice) || parseFloat(element.price));
    });
    this.checkout.userID = this.user.id;
  }

  checkUser() {
    this.user =  this.commonService.getUser();
    if (this.user.id) {
      this.commonService.get(links.order + '?filter=userID,eq,' + this.user.id + '&page=1,1&order=id,desc').subscribe(data => {
        if (data[0]) {
          this.checkout.name = data[0].name;
          this.checkout.mobile = data[0].mobile;
          this.checkout.address = data[0].address;
        }
      });
    }
  }

  escapeChars(text) {
    return decodeURIComponent(text);
  }

  productURL(id, name) {
    return this.commonService.productURL(id, name);
  }

  delete(product) {
    const index = this.cart.indexOf(product);
    this.cart.splice(index, 1);
    window.localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  completeOrder() {
    const cart = [...this.cart];
    this.checkout.userID = this.user.id;
    this.commonService.post(links.order, this.checkout).subscribe(data => {
      const orderIDStr = data;
      this.cart = [];
      window.localStorage.setItem('cart', JSON.stringify(this.cart));
      this.commonService.cart = [];
      const orderStatus = {orderID: data, statusID: 1};
      this.commonService.post(links.order_status, orderStatus).subscribe(() => {});
      cart.forEach(product => {
        const prod = {productID: product.id, price: product.offerPrice || product.price, orderID: orderIDStr, image: product.image};
        this.commonService.post(links.order_products, prod).subscribe(() => {});
      });
      this.router.navigate(['/order/' + orderIDStr]);
    });
  }

  loginRegSuccess(event) {
    this.checkUser();
  }
  offerExpired(event, product) {
    product.offerPrice = product.offerStart = product.offerEnd = null;
    this.commonService.put(links.products + '/' + product.id, product).subscribe(() => {});
  }
}
