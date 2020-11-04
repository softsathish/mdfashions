import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { links } from '../links';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private baseURL = 'https://www.mdcart.in/api/api.php/records/';
  public userTypes = [{id: 0, name: 'Admin', redirect: '/admin/dashboard'},
  {id: 1, name: 'Customer', redirect: '/cart'}, {id: 2, name: 'Seller', redirect: '/seller-dashboard'}];
  public cart: any = JSON.parse(window.localStorage.getItem('cart')) || [];
  public totalRecords: any = {};

  constructor(private http: HttpClient) {
    this.getCart();
  }

  get(url): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.http.get(this.baseURL + url).subscribe((data: any) => {
        this.totalRecords[url] = data.results;
        observer.next(data.records || data);
        observer.complete();
      });
    });
  }

  post(url, obj) {
    return this.http.post(this.baseURL + url, obj);
  }

  put(url, obj) {
    return this.http.put(this.baseURL + url, obj);
  }

  delete(url) {
    return this.http.delete(this.baseURL + url);
  }

  upload(url, obj) {
    return this.http.post('https://www.mdcart.in/' + url, obj);
  }

  productURL(id, name, imageID?) {
    let url = '/product/' + id + '/' + name.replace(/[\W_]+/g, '-').toLowerCase();
    if (imageID) {
      url = '/product/variant/' + id + '/' + name.replace(/[\W_]+/g, '-').toLowerCase() + '/' + imageID;
    }
    return url;
  }

  urlTitle(name) {
    return name.replace(/[\W_]+/g, '-').toLowerCase();
  }

  getCart() {
    this.cart = JSON.parse(window.localStorage.getItem('cart')) || [];
  }
  updateCart(product) {
    this.cart.push(product);
    window.localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  getUser() {
    return JSON.parse(sessionStorage.getItem('user')) || {};
  }

  variantsUITODB(variants, productID) {
    const productvariants = [];
    variants.forEach(element => {
      element[Object.keys(element)[0]].forEach(termID => {
        const termObj = {variant_term_id: termID, productID};
        productvariants.push(termObj);
      });
    });
    return productvariants;
  }

  variantsDBTOUI(variants, productVariants) {
    const result = [];
    variants.forEach(variant => {
      const varObj = {};
      varObj[variant.id] = [];
      variant.variant_terms.forEach(term => {
        const termID = productVariants.filter(prodVar => parseInt(prodVar.variant_term_id, 10) === parseInt(term.id, 10))[0];
        if (termID) {
          varObj[variant.id].push(term.id);
        }
      });
      result.push(varObj);
    });
    return result;
  }

  getProductURLForList(filter) {
    let url = links.categories_products_view + '?status=0';
    let filterStr = '';
    if (filter.id) {
      filterStr = filterStr + '&filter=categoryID,eq,' + filter.id;
    }
    return url = url + filterStr;
  }
}

