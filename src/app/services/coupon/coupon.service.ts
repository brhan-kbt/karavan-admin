import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  baseUrl: string = `${environment.apiUrl}/api/Coupon`;
  cache: { [key: string]: any | undefined } = {}; // Internal cache object

  constructor(private http: HttpClient) { }

  async getAll() {
      const url= this.baseUrl;
      const res = await this.http.get<any>(url).toPromise();
      return res;
  }

  async saveBranch(data: any) {
    console.log('Coupon Data :',data);
    const url= this.baseUrl + '/create'
    const res = await this.http.post<any>(url, data).toPromise();
    return res;
  }

  async getById(id: number) {
    const cacheKey = `product_${id}`;
    if (this.cache[cacheKey]) {
      return this.cache[cacheKey]; // Return cached data
    } else {
      const res = await this.http.get<any>(`${this.baseUrl}/${id}`).toPromise();
      this.cache[cacheKey] = res; // Store data in cache
      return res;
    }
  }

  async update(data: any, id: number) {
    const url = this.baseUrl + '/update'
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    const res = await this.http.put<any>(`${url}/${id}`, data).toPromise();
    return res;
  }

  deleteBranch(id:any){
     const url = this.baseUrl + '/delete'
    return this.http.delete<any>(`${url}/${id}`).pipe(
      map((res: any) => {
        return res;

      })
    );
   }

}
