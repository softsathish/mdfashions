import { Component, OnInit } from '@angular/core';
import { links } from 'src/app/links';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {
  list: any;
  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.commonService.get(links.categories_products_count_view + '?order=categoryName').subscribe(data => {
      this.list = data;
    });
  }

  escapeChars(text) {
    return decodeURIComponent(text);
  }

  productURL(name) {
    return this.commonService.urlTitle(name);
  }

}
