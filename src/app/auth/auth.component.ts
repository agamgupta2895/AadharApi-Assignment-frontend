import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  otpField = false;
  showLoading = false;
  constructor(public authService: AuthService, public router: Router) {
  }

  ngOnInit() {
  }

  onAuth(form: NgForm) {
    const email = form.value.email;
    this.showLoading = true;
    this.authService.authenticateUser(email).subscribe(
      (response) => {
        console.log(response.json());
        if (response.json().success) {
          this.otpField = true;
          this.showLoading = false;
        } else {
          //error handling
        }
      }
    );
  }

  onOTPVerify(formOTP: NgForm) {
    const otp = formOTP.value.otp;
    this.authService.verifyOTP(otp).subscribe(
      (response) => {
        if (response.json().success) {
          localStorage.setItem('adhaar_token', response.json().token);
          this.router.navigate(['home']);

        } else {
          //error handling
          //attempts
        }
      }
    );
  }
}
