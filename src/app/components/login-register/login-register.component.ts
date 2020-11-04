import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {
  user: any = {};
  constructor(private commonService: CommonService, private router: Router) { }

  ngOnInit(): void {
    this.redirectUser();
  }

  redirectUser() {
    this.user =  this.commonService.getUser();
    console.log(this.user)
    if (this.user && this.user.type) {
      const redirect = this.commonService.userTypes.filter((obj: any) => obj.id === parseInt(this.user.type, 10))[0].redirect;
      this.router.navigate([redirect]);
    }
  }

  loginRegSuccess(event) {
    this.redirectUser();
  }

}
