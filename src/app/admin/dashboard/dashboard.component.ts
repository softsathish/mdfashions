import { Component, OnInit } from '@angular/core';
import { links } from 'src/app/links';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  dashboard: any = {};

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.getDashboardDetails();
  }

  getDashboardDetails() {
    this.commonService.get(links.admin_dashboard_view).subscribe(data => {
      this.dashboard = data[0];
    });
  }

}
