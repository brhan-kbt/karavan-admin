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
  constructor(private fb:FormBuilder, private auth:AuthService, private router:Router){
   
  }
  ngOnInit(): void {
    this.loginForm=this.fb.group({
      phoneNumber:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }

  
  login(){
    if(this.loginForm.valid){
      this.auth.login(this.loginForm.value).subscribe(res=>{
        this.auth.saveToken(res.data.token);
        this.auth.saveRefreshToken(res.data.refereshToken);
        this.auth.saveUser(res.data);
        this.router.navigate(['/dashboard']); // Redirect to login page if not authenticated
      })
    }
  }
}
