// websocket.service.ts
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private hubConnection!: HubConnection;

  baseUrl : string = environment.apiUrl;

  private productUpdatedSubject = new Subject<any>();
  productUpdated$ = this.productUpdatedSubject.asObservable();

  constructor() {}

  startConnection() {
    const hubUrl = `${this.baseUrl}/WebSocketHub`; // Replace with your actual URL
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(hubUrl)
      .build();

    this.hubConnection.start()

      .then(() => {
        console.log('WebSocket connection started');
        // this.registerEventHandlers();
      })
      .catch((error:any) => {
        console.error('Error starting WebSocket connection:', error);
      });

  }

   private registerEventHandlers() {
      this.hubConnection.on('ProductUpdated', (product: any) => {
       //  Handle product updates here
        console.log('Received product update:', product);
      });

      this.hubConnection.on('ProductAvailabilityUpdated', (product: any) => {
        // Handle product updates here
        // this.updateCachedProductCat(product); // Call a function to update cachedProductCat
        console.log('ProductAvailability update:', product);
      });

      this.hubConnection.on('PaymentStatusUpdate', (product: any) => {
        // Handle product updates here
        console.log('PaymentStatusUpdate update:', product);
      });


      this.hubConnection.on('OrderableProduct', (product: any) => {
        // Handle product updates here

        console.log('OrderableProduct update add to category:', product);
      });


      this.hubConnection.on('NotOrderableProduct', (product: any) => {
        // Handle product updates here

        console.log('NotOrderableProduct update remove from category:', product);
      });

      this.hubConnection.on('ProductCreated', (product: any) => {
        // Handle product creations here
        console.log('Received product creation:', product);
      });
   }


  // Public method to access the hub connection instance
  getHubConnection(): HubConnection {
    return this.hubConnection;
  }
}
