import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
interface SideNavToggle{
  screenWidth:number;
  collapsed:boolean;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'karavan-admin-dashboard';

  isSideNavCollapsed=false;
  screenWidth=0;
  isLoginPage:any;
  loggedIn:boolean=false;
  constructor(private router:Router, private auth:AuthService){

  }
  
  ngOnInit() {
    const loggedIn = this.auth.isAuthenticated();
    if (loggedIn) {
      this.loggedIn = true;
    } else {
      this.router.navigate(['/login']);
    }
    console.log('Logged:', this.loggedIn);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = event.url === '/login';
        console.log(this.isLoginPage);
      }
    });
  }
  
  
  
  
  onToggleSideNav(data:SideNavToggle){
    this.screenWidth=data.screenWidth;
    this.isSideNavCollapsed=data.collapsed;
  }
}
