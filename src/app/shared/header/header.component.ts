import { Component, HostListener, Input, OnInit } from '@angular/core';
import { languages, notifications, userItems } from './header-dummy-data';
import { OrderService } from 'src/app/services/order/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
 
  @Input() collapsed=false;
  @Input() screenWidth =0;
  canShowSearchAsOverlay=false;
  selectedLanguage:any;
  languages=languages;
  notifications=notifications;
  userItems=userItems;
  pendingData:any;

  @HostListener('window:resize',['$event'])
  onResize(event:any){
    this.checkCanShowSearchAsOverlay(window.innerWidth)
  }

  constructor( private order:OrderService, private router:Router){
    order.getBranchOrders().then(res=>{
      console.log("Pending: ",res)
      this.pendingData=res.data;
    })

  }
  ngOnInit(): void {
    this.checkCanShowSearchAsOverlay(window.innerWidth)
    this.selectedLanguage=this.languages[0];
  }
  getHeadClass():string{
    let styleClass ='';
    if(this.collapsed && this.screenWidth > 768){
      styleClass='head-trimmed';
    }
    else{
      styleClass='head-md-screen';
    }
    return styleClass;
  }
  checkCanShowSearchAsOverlay(innerwidth:number){
    if(innerwidth<845){
      this.canShowSearchAsOverlay=true;
    }
    else{
      this.canShowSearchAsOverlay=false;
    }
  }

  formatDateTime(dateTime: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };
  
    return new Date(dateTime).toLocaleString('en-US', options);
  }
  

  showProductDetails(data:any){
    this.order.setSelectedOrder(data);
    this.router.navigate([`order/detail/${data.id}`]);
  }
}
