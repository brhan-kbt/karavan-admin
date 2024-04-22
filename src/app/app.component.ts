import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { Meta } from '@angular/platform-browser';
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
  constructor(private router:Router, private auth:AuthService,private meta:Meta){

  }

  ngOnInit() {
    this.meta.addTag({ name: 'title', content: 'Karavan - Your Go-To Destination' });

    this.meta.addTag(
      {
        name:'description',
        content:`
        Discover the heart
                of Ethiopia at Karavan - your go-to destination for
                exquisite cakes, gourmet coffee, and delightful cuisine.
                Explore our diverse menu, embrace the warm ambiance, and
                experience the unique flavors of Ethiopia. Visit us today!`
      });
      this.meta.addTag({
        name:'keywords',
        content:`
        Ethiopian café,
        Best cakes Ethiopia,
        Gourmet coffee Ethiopia,
        Ethiopian cuisine,
        Café in Ethiopia
        `
      })
    this.auth.loggedIn$.subscribe(logged=>{
      this.loggedIn=logged;
    })
    if (this.loggedIn) {
      this.loggedIn = true;
    } else {
      this.router.navigate(['/login']);
    }
    console.log('Logged:', this.loggedIn);
    if(!this.loggedIn){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = event.url === '/login';
        console.log(this.isLoginPage);
      }
    });
  }
  }




  onToggleSideNav(data:SideNavToggle){
    this.screenWidth=data.screenWidth;
    this.isSideNavCollapsed=data.collapsed;
  }



}
