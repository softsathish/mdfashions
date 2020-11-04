import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  productID: any;
  user: any = {};
  menuItems: any = [];

  constructor(private route: ActivatedRoute, public commonService: CommonService,
    public headerService: HeaderService) { }

  ngOnInit(): void {
    this.headerService.updateHeaderItems();
  }

}
