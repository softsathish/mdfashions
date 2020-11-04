import { Injectable } from '@angular/core';
import { links } from '../links';
import { CommonService } from '../services/common.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private commonService: CommonService) { }

  get(url) {
    return this.commonService.get(url);
  }
  submit(url, obj) {
    console.log(obj, url);
    if (obj.id) {
      return this.commonService.put(links[url] + '/' + obj.id, obj);
    } else {
      return this.commonService.post(links[url], obj);
    }
  }

  delete(url, obj) {
    if (confirm('Are you sure you wants to delete?')) {
      return this.commonService.delete(links[url] + '/' + obj.id);
    }
  }
}
