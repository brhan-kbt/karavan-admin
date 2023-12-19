import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WebsocketService } from '../web-socket/web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class AvaialablityService {
   baseUrl:string= environment.apiUrl;

   constructor(private http: HttpClient, private webSocketService:WebsocketService) {
    webSocketService.startConnection();
    this.registerEventHandlers();

  }

  private registerEventHandlers() {
    // Ensure that the hubConnection is initialized before calling 'on'
    const hubConnection = this.webSocketService.getHubConnection();
    console.log('Hub Connection Out: ', hubConnection);
    if (hubConnection) {
    console.log('Hub Connection In: ', hubConnection);


      hubConnection.on('ProductAvailabilityUpdated', (product: any) => {
        // Handle product updates here
        // this.updateCachedProductCat(product); // Call a function to update cachedProductCat
        console.log('ProductAvailability update:', product);
      });

    }
  }
  async updateAvailability(data: any) {
    const url = this.baseUrl + '/api/BranchProduct/update'
    if(data && data.id){
    const res = await this.http.put<any>(`${url}/${data.id}`, data).toPromise();
    return res;
    }else{
      return 'Failed to update Status';
    }
  }

}
