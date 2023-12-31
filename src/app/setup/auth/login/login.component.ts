import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm!:FormGroup;
  errors:any;
  constructor(private fb:FormBuilder, private auth:AuthService, private router:Router){

  }
  ngOnInit(): void {

    this.loginForm=this.fb.group({
      PhoneOrEmail:['',[Validators.required]],
      password:['',[Validators.required]]
    })

    this.auth.loggedIn$.subscribe(loggedIn => {
      if (loggedIn) {
        this.router.navigate(['/dashboard']);
      }
    });
  }
  loggingIn = false; // Initialize loggingIn as false

  login() {
    this.loggingIn = true; // Start the loading animation

    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe(
        (res) => {
          this.auth.saveToken(res.data.token);
          this.auth.saveRefreshToken(res.data.refereshToken);
          this.auth.saveUser(res.data);
          if(res.data.role==='Admin' ){
            this.router.navigate(['/dashboard']);
          }
          else if(res.data.role==='Branch_Admin'){
            this.router.navigate(['/order/list']);
          } else if(res.data.role==='Finance'){
            this.router.navigate(['/payment/list']);
          }
          this.loggingIn = false; // Start the loading animation
        },
        (error) => {
          if (error && error.error && error.error.message) {
            this.errors = error.error.message;
            this.loggingIn = false; // Start the loading animation

          }
        }
      );
    }
  }

}
