import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { links } from 'src/app/links';

@Component({
  selector: 'app-variants',
  templateUrl: './variants.component.html',
  styleUrls: ['./variants.component.sass']
})
export class VariantsComponent implements OnInit {

  variants: any = [];
  variant: any = {};

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.variant = {};
    this.commonService.get(links.variants).subscribe(data => {
      this.variants = data;
    });
  }

  submit() {
    if (this.variant.id) {
      this.commonService.put(links.variants + '/' + this.variant.id, this.variant).subscribe(data => {
        this.getList();
      });
    } else {
      this.commonService.post(links.variants, this.variant).subscribe(data => {
        this.getList();
      });
    }
  }

  edit(variant) {
    this.variant = {...variant};
  }

  delete(variant) {
    if (confirm('Are you sure you wants to delete ' + variant.name + '? This will delete all the terms as well.')) {
      this.commonService.delete(links.variants + '/' + this.variant.id).subscribe(data => {
        this.getList();
      });
    }
  }

}
