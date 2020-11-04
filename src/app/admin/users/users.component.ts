import { Component, OnInit } from '@angular/core';
import { links } from 'src/app/links';
import { CommonService } from 'src/app/services/common.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  obj: any = {};
  list: any = [];
  url = links.users;
  types: any = [];

  constructor(public api: ApiService, private commonService: CommonService) {
     this.types = this.commonService.userTypes;
  }

  ngOnInit(): void {
    this.get();
  }

  get() {
    this.api.get(this.url).subscribe(data => {
      this.list = data;
    });
  }

  edit(obj) {
    this.obj = obj;
  }

  delete(variant) {
    this.api.delete(this.url + '/' + this.obj.id, this.obj).subscribe(data => {
      this.get();
    })
  }

  submit() {
    this.api.submit(this.url, this.obj).subscribe(data => {
      this.get();
    });
  }

  int(num) {
    return parseInt(num, 10);
  }

  getTypeName(type) {
    return this.types.filter(obj => obj.id === parseInt(type, 10))[0].name;
  }
}
