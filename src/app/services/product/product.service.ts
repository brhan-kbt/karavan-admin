import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl: string = `http://196.189.119.123/api/Product`;
  cache: { [key: string]: Product | undefined } = {}; // Internal cache object

  constructor(private http: HttpClient) { }

  async getProducts() {
    const url = this.baseUrl + '/list'
    const cacheKey = 'products';
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

  async getProds() {
    const url = this.baseUrl + '/list'
    const res = await this.http.get<any>(url).toPromise();
    console.log('From Api', res)
    return res;
}

  async saveProduct(data: Product) {
    const url = this.baseUrl + '/create'
    console.log(data);
    const res = await this.http.post<Product>(url, data).toPromise();
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
    const url = this.baseUrl +'/update'
    const res = await this.http.put<Product>(`${url}/${id}`, data).toPromise();
    return res;
  }


  async updateOrderable(data: any) {
    const url = this.baseUrl + '/update-orderable'
    if(data && data.id){
    const res = await this.http.put<any>(`${url}/${data.id}`, data).toPromise();
    return res;
    }else{
      return 'Failed to update Status';
    }
  }


  // deleteProduct(id:number){
  //   return this.http.delete<Product>("http://localhost:3000/products"+id)
  //           .pipe(map((res:Product)=>{
  //             return res;
  //           }))
  // }

}
