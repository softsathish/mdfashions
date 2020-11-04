import { Component, Injectable } from '@angular/core';
import { Router, Event } from '@angular/router';
import { NavigationStart, NavigationError, NavigationEnd } from '@angular/router';
import { CommonService } from './services/common.service';

// declare ga as a function to access the JS code in TS
declare let ga: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mdcart';
  hideFooter = false;
  user: any = {};
  constructor(private router: Router, private commonService: CommonService) {
    // Router subscriber
    this.router.events.subscribe((event: Event) => {
      this.user = this.commonService.getUser();
      if (event instanceof NavigationStart) {
        // do something on start activity
      }

      if (event instanceof NavigationError) {
        // Handle error
        console.error(event.error);
      }

      if (event instanceof NavigationEnd) {
        // do something on end activity
        this.hideFooter = false;
        sessionStorage.setItem('urlAfterRedirects', event.urlAfterRedirects);
        if (event.urlAfterRedirects.indexOf('/product') > -1) {
          this.hideFooter = true;
        }
      }
    });
  }
}
