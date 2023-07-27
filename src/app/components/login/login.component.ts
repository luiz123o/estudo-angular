import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SignInData } from 'src/app/model/signInData';
import { AuthService } from 'src/app/service/authentication/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})

export class LoginComponent implements OnInit {
  hide = true;

  constructor(private authenticationService: AuthService) {}

  ngOnInit(): void {}
  onSubmit(signInForm: NgForm) {
    console.log(signInForm.value);
    const signInData = new SignInData(
      signInForm.value.email,
      signInForm.value.password
    );
    this.authenticationService.authenticate(signInData);
  }
}
