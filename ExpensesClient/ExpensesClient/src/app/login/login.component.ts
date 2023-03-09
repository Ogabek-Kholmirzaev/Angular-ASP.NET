import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(){
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe(
      (data: any) => {
        console.log(data);
        localStorage.setItem('userName', data.userName);
        localStorage.setItem('token_value', data.token);
        alert("Successfully logged in!");
        this.router.navigate(['/']).then(() => { window.location.reload() });
      },
      (error: HttpErrorResponse) => {
        alert(error.error);
      }
    );
  }
}
