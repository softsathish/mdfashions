import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { links } from 'src/app/links';
import { CommonService } from 'src/app/services/common.service';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: any = {};
  register: any = {};
  error: any = {};
  @Output() loginRegSuccess: EventEmitter<any> = new EventEmitter();
  selectedTab = 'login';
  mobNumberPattern = '^((\\+91-?)|0)?[0-9]{10}$';
  isValidFormSubmitted = false;

  constructor(private commonService: CommonService, private router: Router, private headerService: HeaderService) { }

  ngOnInit(): void {
    const user = JSON.parse(sessionStorage.getItem('user'));
  }

  loginSubmit() {
    this.error = {};
    this.commonService.get(links.users + '?filter=mobile,eq,' + this.login.mobile +
        '&filter=password,eq,' + this.login.password).subscribe(data => {
      if (data.length > 0) {
        delete data[0].password;
        sessionStorage.setItem('user', JSON.stringify(data[0]));
        const redirect = this.commonService.userTypes.filter((obj: any) => obj.id === parseInt(data[0].type, 10))[0].redirect;
        this.loginRegSuccess.emit('success');
        // this.router.navigate([redirect]);
        this.headerService.updateHeaderItems();
      } else {
        this.error.login = 'Invalid Credentials';
      }
    });
  }

  registerSubmit() {
    this.error = {};
    this.commonService.post(links.users, this.register).subscribe(
      regID => {
      this.commonService.get(links.users + '/' + regID).subscribe(data => {
        if (data.length > 0) {
          delete data[0].password;
          sessionStorage.setItem('user', JSON.stringify(data[0]));
          const redirect = this.commonService.userTypes.filter((obj: any) => obj.id === parseInt(data[0].type, 10))[0].redirect;
          this.loginRegSuccess.emit('success');
          this.headerService.updateHeaderItems();
          // this.router.navigate([redirect]);
        }
      });
    }, error => {
      if (error.error.code === 1009) {
        this.error.register = this.register.mobile + ' is already registered with us. Please login.';
      }
      else if (error.error.code === 9999) {
        this.error.register = 'Invalid inputs. Please check';
      }
    });
  }

}
