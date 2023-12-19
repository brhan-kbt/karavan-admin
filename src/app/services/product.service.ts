import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';
import { WebsocketService } from './web-socket/web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl: string = `${environment.apiUrl}/api/Product`;
  cache: { [key: string]: Product | undefined } = {}; // Internal cache object
  private cachedProductList$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  // Expose it as an observable
  public cachedProductListObservable$: Observable<any> = this.cachedProductList$.asObservable();

  constructor(private http: HttpClient, private webSocketService:WebsocketService) {
    webSocketService.startConnection();
    const hubConnection = this.webSocketService.getHubConnection();
console.log('Product Service - Connection Status PS:', hubConnection);

    this.registerEventHandlers();

  }

  private registerEventHandlers() {
    // Ensure that the hubConnection is initialized before calling 'on'
    const hubConnection = this.webSocketService.getHubConnection();
    console.log('Hub Connection Out: ', hubConnection);
    if (hubConnection) {
    console.log('Hub Connection In: ', hubConnection);

      hubConnection.on('ProductUpdated', (product: any) => {
        // Handle product updates here
        // this.updateCachedProductList(product);
        console.log('Received product update:', product);
      });

      hubConnection.on('ProductAvailabilityUpdated', (product: any) => {
        // Handle product updates here
        // this.updateCachedProductCat(product); // Call a function to update cachedProductCat
        console.log('ProductAvailability update:', product);
      });

      hubConnection.on('PaymentStatusUpdate', (product: any) => {
        // Handle product updates here
        console.log('PaymentStatusUpdate update:', product);
      });


      hubConnection.on('OrderableProduct', (product: any) => {
        // Handle product updates here
        this.updateCachedProductList(product);

        console.log('OrderableProduct update add to category:', product);
      });


      hubConnection.on('NotOrderableProduct', (product: any) => {
        // Handle product updates here

        console.log('NotOrderableProduct update remove from category:', product);
      });

      hubConnection.on('ProductCreated', (product: any) => {
        // Handle product creations here
        console.log('Received product creation:', product);
      });
    }
  }
  async getProducts() {
    const url = this.baseUrl + '/list'
    const cacheKey = 'products';
    if (this.cache[cacheKey]) {
      console.log('From Cache');
      return this.cache[cacheKey]; // Return cached data
    } else {
      const res = await this.http.get<any>(url).toPromise();
      this.cache[cacheKey] = res; // Store data in cache
      this.cachedProductList$.next(res);
      console.log('From Api', res)
      return res;
    }
  }

  async saveProduct(data: Product) {
    console.log(data);
    const res = await this.http.post<Product>(this.baseUrl, data).toPromise();
    return res;
  }

  async getProductById(id: number) {
    const cacheKey = `product_${id}`;
    if (this.cache[cacheKey]) {
      return this.cache[cacheKey]; // Return cached data
    } else {
      const res = await this.http.get<Product>(`${this.baseUrl}/${id}`).toPromise();
      this.cache[cacheKey] = res; // Store data in cache
      return res;
    }
  }

  async updateProduct(data: Product, id: number) {
    const res = await this.http.put<Product>(`${this.baseUrl}/${id}`, data).toPromise();
    this.cachedProductList$.next(res);
    return res;

  }

  // deleteProduct(id:number){
  //   return this.http.delete<Product>("http://localhost:3000/products"+id)
  //           .pipe(map((res:Product)=>{
  //             return res;
  //           }))
  // }

  private updateCachedProductList(updatedProduct: any): void {
    const cacheKey = 'products';
    console.log('Updated Product Cat:', updatedProduct);
    console.log('Cached Product Cat:', this.cache[cacheKey]);


  }
}
