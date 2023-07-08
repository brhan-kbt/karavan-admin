import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { navbarData } from './nav-data';
import { style, transition, trigger,animate, keyframes } from '@angular/animations';
import { INavbarData, fadeInOut } from './helper';
import { Router } from '@angular/router';

interface SideNavToggle{
  screenWidth:number;
  collapsed:boolean;
}
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations:[
   fadeInOut,
    trigger('rotate',[
      transition(':enter',[
        animate('1000ms',
        keyframes([
          style({transform:'rotate(0deg)',offset:'0'}),
          style({transform:'rotate(2turn)',offset:'1'})
        ])
        )
      ])
    ])
  ]
})
export class SidenavComponent implements OnInit{
 

  @Output() onToggleSideNav:EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed=false;
  screenWidth=0;
  navData=navbarData;
  multiple:boolean=false;

  constructor(private router:Router){

  }
  @HostListener('window:resize',['$event'])
  onResize(event:any){
    this.screenWidth=window.innerWidth;
    if(this.screenWidth<=768){
      this.collapsed=false;
      this.onToggleSideNav.emit({collapsed:this.collapsed, screenWidth:this.screenWidth})
    }
  }
  ngOnInit(): void {
   this.screenWidth=window.innerWidth;
  }
toggleCollapse(){
  this.collapsed=!this.collapsed;
  this.onToggleSideNav.emit({collapsed:this.collapsed, screenWidth:this.screenWidth})
}
closeSideNav(){
this.collapsed=false;
this.onToggleSideNav.emit({collapsed:this.collapsed, screenWidth:this.screenWidth})
}

handleClick(item:INavbarData){
  this.shrinkItems(item);
  item.expanded=!item.expanded
}

getActiveClass(data:INavbarData):string{
  return this.router.url.includes(data.routeLink)?'active':'';
}
shrinkItems(item:INavbarData){
  if(!this.multiple){
    for (let modelItem of this.navData) {
     if(item !== modelItem && modelItem.expanded){
      modelItem.expanded=false
     }      
    }
  }
}
}
