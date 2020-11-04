import { Component, OnInit } from '@angular/core';
import { noop, Observable, Observer, of, Subscriber } from 'rxjs';
import { links } from 'src/app/links';
import { CommonService } from 'src/app/services/common.service';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-product-offers',
  templateUrl: './product-offers.component.html',
  styleUrls: ['./product-offers.component.scss']
})
export class ProductOffersComponent implements OnInit {

  productsList: any = [];
  offer: any = { startDate: new Date(), startTime: new Date(), endDate: new Date(), endTime: new Date() };
  myDate: any;
  selectedProduct: any = {};
  productsList$: Observable<any[]>;

  constructor(private commonService: CommonService) {
   }

  ngOnInit(): void {
    // this.searchProduct('');
    this.productsList$ = new Observable((observer: Observer<string>) => {
      observer.next(this.offer.productID);
    }).pipe(
      switchMap((query: string) => {
        if (query) {
          // using github public api to get users by name
          return this.commonService.get(links.products + '?filter1=title,cs,' + this.offer.productID
          + '&page=1,10&order=id,desc')
          .pipe(
            map((data: any) => data || [])
          );
        }
        return of([]);
      })
    );
  }

  escapeChars(text) {
    return decodeURIComponent(text);
  }

  addOffer() {
    this.offer.start = this.mergeDateTime(this.offer.startDate, this.offer.startTime);
    this.offer.end = this.mergeDateTime(this.offer.endDate, this.offer.endTime);
    delete this.offer.startDate;
    delete this.offer.startTime;
    delete this.offer.endDate;
    delete this.offer.endTime;
    this.commonService.post(links.product_offer, this.offer).subscribe(() => {
      this.offer = {};
    });
  }

  mergeDateTime(sdate, stime) {
    const dd = new Date(sdate).getDate();
    const mm = new Date(sdate).getMonth() + 1;
    const yy = new Date(sdate).getFullYear();
    const hh = new Date(stime).getHours();
    const ms = new Date(stime).getMinutes();
    console.log(yy + ',' + mm + ',' + dd + ' ' + hh + ':' + ms);
    return new Date(yy + ',' + mm + ',' + dd + ' ' + hh + ':' + ms);
  }

}
