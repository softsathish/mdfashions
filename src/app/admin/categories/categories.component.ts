import { Component, OnInit } from '@angular/core';
import { links } from 'src/app/links';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  category: any = {};
  categories: any = [];
  parentCategories = [];

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.getList();
  }

  edit(cat) {
    this.category = cat;
  }

  delete(cat) {
    if (confirm('Are you sure you wants to delete ' + cat.name + '?')) {
      this.commonService.delete(links.categories + '/' + cat.id).subscribe(data => {
        this.getList();
      });
    }
  }

  getList() {
    this.category = {};
    this.commonService.get(links.categories).subscribe(data => {
      this.categories = data;
      this.parentCategories = data.filter(obj => obj.parent_id === '0');
      console.log(data.filter(obj => obj.parent_id === '0'))
    });
  }

  submit() {
    if (this.category.id) {
      this.commonService.put(links.categories + '/' + this.category.id, this.category).subscribe(data => {
        this.getList();
      });
    } else {
      this.commonService.post(links.categories, this.category).subscribe(data => {
        this.getList();
      });
    }
  }

}
