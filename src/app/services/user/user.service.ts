import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = `${environment.apiUrl}/admin/user/list`;
  a_baseUrl: string = `${environment.apiUrl}`;

  cache: { [key: string]: any | undefined } = {}; // Internal cache object

  constructor(private http: HttpClient) { }

  async getUsers() {
    const cacheKey = 'users';
    if (this.cache[cacheKey]) {
      console.log('From Cache');
      return this.cache[cacheKey]; // Return cached data
    } else {
      const res = await this.http.get<any>(this.baseUrl).toPromise();
      this.cache[cacheKey] = res; // Store data in cache
      console.log('From Api', res)
      return res;
    }
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


  async updateStatus(data: any) {
    if(data && data.id){
    const res = await this.http.put<any>(`${this.a_baseUrl}/admin/user/update-status/${data.id}`, data).toPromise();
    return res;
    }else{
      return 'Failed to update Status';
    }
  }


  async updateBranchofAdmin(data: any) {
    if(data && data.id){
      const res = await this.http.put<any>(`${this.a_baseUrl}/admin/user/update-admin-branch/${data.id}`, data).toPromise();
      return res;
    }
    else{
      return 'Failed to Update Branch for Branch Admin'
    }
  }


  async updateRole(data: any) {
    if(data && data.id){
      const res = await this.http.put<any>(`${this.a_baseUrl}/admin/user/update-role/${data.id}`, data).toPromise();
      return res;
    }
    else{
      return 'Failed to Update Role'
    }
  }

   deleteUser(data:any){
    return this.http.put<any>(`${this.a_baseUrl}/admin/user/softDelete/${data.id}`, data).pipe(
      map((res: any) => {
        this.updateCache();
        console.log('====================================');
        return res;

      })
    );
   }

   deleteUserPermanently(id:any){
    return this.http.delete<any>(`${this.a_baseUrl}/admin/user/delete/${id}`).pipe(
      map((res: any) => {
        this.updateCache();
        console.log('====================================');
        return res;

      })
    );
   }

}

