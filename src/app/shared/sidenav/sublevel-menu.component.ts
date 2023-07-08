import { Component, Input } from '@angular/core';
import { INavbarData, fadeInOut } from './helper';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sublevel-menu',
  template: `
    <ul *ngIf="collapsed && data.items && data.items.length>0"
    [@submenu]="expanded
    ?{value:'visible', params:{transitionParams:'400ms cubic-bezier(0.86, 0, 0.07, 1)', height:'*'}}
    :{value:'hidden', params:{transitionParams:'400ms cubic-bezier(0.86, 0, 0.07, 1)', height:'0'}}
    "

    class="sublevel-nav-item"
    >
    <li *ngFor="let item of data.items" class="sublevel-nav-item">
      <a  class="sublevel-nav-link"
      (click)='handleClick(item)'
      *ngIf="item.items && item.items.length>0"
      [ngClass]="getActiveClass(item)"
      >
      <i class="sublevel-link-icon " [class]="item.icon"></i>  
      <span class="sublevel-link-text" @fadeInOut *ngIf="collapsed">{{item.label}}</span>
      <i class="menu-collapse-icon" *ngIf="item.items && collapsed"
       [ngClass]="!item.expanded ? 'fal fa-plus':'fal fa-minus'"
      ></i>     
      </a>
      <a class="sublevel-nav-link"
      *ngIf="!item.items || (item.items && item.items.length===0)"
       [routerLink]="[item.routeLink]"
       routerLinkActive="active-sublevel"
       [routerLinkActiveOptions]="{exact:true}"
      >
      <i class="sublevel-link-icon" [class]="item.icon"></i>  
      <span class="sublevel-link-text" @fadeInOut *ngIf="collapsed">{{item.label}}</span>
    </a>
    <div *ngIf="item.items && item.items.length >0">
      <app-sublevel-menu 
      [data]="item"
      [multiple]="multiple"
      [expanded]="item.expanded"
      [collapsed]="collapsed">

      </app-sublevel-menu>
    </div>
    </li>
    </ul>
  `,
 styleUrls: ['./sidenav.component.scss'],
 animations:[
  fadeInOut,
  trigger('submenu',[
    state('hidden',style({
      height:'0',
      overflow:'hidden'
    })),
    state('visible',style({
      height:'*'
    })),
    transition('visible<=> hidden', [style({overflow:'hidden'}),
      animate('{{transitionParams}}')
    ]),
    transition('void => *', animate(0))
  ])
 ]
})
export class SublevelMenuComponent {

  @Input() data:INavbarData ={
    routeLink:'',
    icon:'',
    label:'',
    items:[]
  }

  @Input() collapsed = false;
  @Input() animating:boolean | undefined;
  @Input() expanded:boolean | undefined;
  @Input() multiple:boolean =false;

  constructor(private router:Router){
    
  }
  handleClick(item:any){
    if(this.multiple){
      if(this.data.items && this.data.items.length>0){
        for(let modelItem of this.data.items){
          if(item !== modelItem && modelItem.expanded){
            modelItem.expanded=false;
          }
        }
      }
    }
    item.expanded=!item.expanded;
  }

  
getActiveClass(data:INavbarData):string{
  return this.router.url.includes(data.routeLink)?'active-sublevel':'';
}
}

