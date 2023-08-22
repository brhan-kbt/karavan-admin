import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private selectedOrderSubject = new BehaviorSubject<any | null>(null);
  selectedOrder$ = this.selectedOrderSubject.asObservable();

  baseUrl: string = `${environment.apiUrl}/api/Order`;
  cache: { [key: string]: any | undefined } = {}; // Internal cache object
  constructor( private http:HttpClient) { }

  setSelectedOrder(product: any | null) {
    this.selectedOrderSubject.next(product);
  }

 async getById(id:any){
    const cacheKey = `order_${id}`;
    if (this.cache[cacheKey]) {
      return this.cache[cacheKey]; // Return cached data
    } else {
      const res = await this.http.get<any>(`${this.baseUrl}/${id}`).toPromise();
      this.cache[cacheKey] = res.data; // Store data in cache
      return res.data;
    }
  }



  async getOrders() {
    const url = this.baseUrl + '/list'
    const cacheKey = 'orders';
    if (this.cache[cacheKey]) {
      console.log('From Cache');
      return this.cache[cacheKey]; // Return cached data
    } else {
      const res = await this.http.get<any>(url).toPromise();
      this.cache[cacheKey] = res; // Store data in cache
      console.log('From Api', res)
      return res;
    }
  }

  async getOrder() {
    const url = this.baseUrl + '/list'
    const res = await this.http.get<any>(url).toPromise();
    console.log('From Api', res)
    return res;
}

  async saveOrder(data: any) {
    const url = this.baseUrl + '/create'
    console.log(data);
    const res = await this.http.post<any>(url, data).toPromise();
    return res;
  }



  async updateOrder(data: any) {
    const url = this.baseUrl + '/update'
    if(data && data.id){
    const res = await this.http.put<any>(`${url}/${data.id}`, data).toPromise();
    return res;
    }else{
      return 'Failed to update Status';
    }
  }
}
