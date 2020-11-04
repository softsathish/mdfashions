import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  user: any = {};
  menuItems: any = [];
  constructor(private commonService: CommonService) { }

  updateHeaderItems() {
    console.log('update called');
    this.user =  this.commonService.getUser();
    this.menuItems = [];
    switch (this.user.type) {
      case '0': {
        this.menuItems = [
          { title: 'Dashboard', link: '/admin/dashboard' },
          { title: 'Products', link: '/admin/products' },
          { title: 'Orders', link: '/admin/orders' },
          { title: 'Offers', link: '/admin/offers' },
          { title: 'Manage Categories', link: '/admin/categories' },
          { title: 'Manage Variants', link: '/admin/variants' },
          { title: 'Manage Users', link: '/admin/users' },
          { title: 'Logout', link: '/logout' },
        ];
        break;
      }
      case '1': {
        this.menuItems = [
          { title: 'Products', link: '/products' },
          { title: 'Orders', link: '/orders' },
          { title: 'Logout', link: '/logout' },
        ];
        break;
      }
      default: {
        this.menuItems = [
          { title: 'Products', link: '/products' },
          { title: 'Categories', link: '/categories' }
        ];
      }
    }
  }
}
