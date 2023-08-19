import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  baseUrl:string=environment.apiUrl;
  cache: { [key: string]: any } = {}; // Internal cache object

  constructor(private http:HttpClient) { }

  async getContents() {
    const url = this.baseUrl + '/api/Content/list'
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

  async updateContent(data: any) {
    const url = this.baseUrl + '/api/Content/update'
    if(data && data.id){
    const res = await this.http.put<any>(`${url}/${data.id}`, data).toPromise();
    return res;
    }else{
      return 'Failed to update Status';
    }
  }
}
