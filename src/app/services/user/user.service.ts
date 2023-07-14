import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = `http://196.189.119.123/admin/user/list`;
  cache: { [key: string]: any | undefined } = {}; // Internal cache object

  constructor(private http: HttpClient) { }

  async getUsers() {
      const res = await this.http.get<any>(this.baseUrl).toPromise();
      console.log('From Api', res)
      return res;
  }

  async updateCache() {
      const cacheKey = 'users';
      const res = await this.http.get<any>(this.baseUrl).toPromise();
      this.cache[cacheKey] = res; 
      console.log('From Api', res)
      return res;
  }

  saveUser(data: any) {
    console.log(data);
    return this.http.post<any>(this.baseUrl, data).pipe(
           map((res: any) => {
            this.updateCache();
             return res;
           })
         );
  }


  async getUserById(id: number) {
    const cacheKey = `user_${id}`;
    if (this.cache[cacheKey]) {
      return this.cache[cacheKey]; // Return cached data
    } else {
      const res = await this.http.get<any>(`${this.baseUrl}/${id}`).toPromise();
      this.cache[cacheKey] = res; // Store data in cache
      return res;
    }
  }

  async updateUser(data: any, id: number) {
    const res = await this.http.put<any>(`${this.baseUrl}/${id}`, data).toPromise();
    return res;
  }

   deleteUser(id:any){
    return this.http.delete<any>(`http://196.189.119.123/admin/user/delete/${id}`).pipe(
      map((res: any) => {
        this.updateCache();
        console.log('====================================');
        return res;
        
      })
    );
   }
 
}
