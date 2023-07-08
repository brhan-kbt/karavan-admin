import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
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
  constructor(private router:Router){

  }
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = event.url === '/login';
        console.log('====================================');
        console.log(this.isLoginPage);
        console.log('====================================');
      }
    });
  }
  
  
  onToggleSideNav(data:SideNavToggle){
    this.screenWidth=data.screenWidth;
    this.isSideNavCollapsed=data.collapsed;
  }
}
