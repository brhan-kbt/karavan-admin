import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  baseUrl: string = `${environment.apiUrl}/api`;
  cache: { [key: string]: any | undefined } = {}; // Internal cache object

  constructor(private http:HttpClient ) { }

  async getReport() {
    const url = this.baseUrl + '/Report/list'
    const cacheKey = 'report';
    if (this.cache[cacheKey]) {
      console.log('Report From Cache');
      return this.cache[cacheKey]; // Return cached data
    } else {
      const res = await this.http.get<any>(url).toPromise();
      this.cache[cacheKey] = res.data; // Store data in cache
      console.log('Report From Api', res.data)
      return res.data;
    }
  }
}
