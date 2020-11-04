import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { links } from 'src/app/links';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {

  terms: any = [];
  term: any = {};
  variantID = '';
  variantName = '';

  constructor(private commonService: CommonService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.variantID = param.id;
      this.variantName = param.name;
      this.getList();
    });
  }

  getList() {
    this.term = {};
    this.commonService.get(links.variant_terms + '?order=name&filter=variant_id,eq,' + this.variantID).subscribe(data => {
      this.terms = data;
    });
  }

  submit() {
    this.term.variant_id = this.variantID;
    if (this.term.id) {
      this.commonService.put(links.variant_terms + '/' + this.term.id, this.term).subscribe(data => {
        this.getList();
      });
    } else {
      this.commonService.post(links.variant_terms, this.term).subscribe(data => {
        this.getList();
      });
    }
  }

  edit(term) {
    this.term = {...term};
  }

  delete(term) {
    this.commonService.delete(links.variant_terms + '/' + term.id).subscribe(data => {
      this.getList();
    });
  }

  getColorName(name) {
    return name.replace(' ', '').toLowerCase();
  }

  getVariantName(name) {
    return name.toUpperCase();
  }

}
