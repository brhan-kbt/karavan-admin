import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token!: string ;
  baseUrl:string=`http://196.189.119.123`;

  constructor(private http: HttpClient) {}

  login(data:any): Observable<any> {
    const url = this.baseUrl + '/admin/auth/login'
    return this.http.post<any>(url, data);
  }

  saveToken(token: string): void {
    localStorage.setItem('karavanToken', token);
  }

  saveRefreshToken(token: string): void {
    localStorage.setItem('karavanRefreshToken', token);
  }


saveAdminUser(data: any) {
    const url = this.baseUrl + '/admin/auth/create'; // Replace '/admin-users' with the appropriate endpoint
    return this.http.post<any>(url, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  saveFinanceUser(data: any) {
    const url = this.baseUrl + '/admin/auth/create'; // Replace '/admin-users' with the appropriate endpoint
    return this.http.post<any>(url, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  
  saveBranchAdminUser(data: any) {
    const url = this.baseUrl + '/admin/auth/Create/BranchAdmin'; // Replace '/branch-admin-users' with the appropriate endpoint
    return this.http.post<any>(url, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  

  
  async saveFinanceAdminUser(data: any) {
    const url = this.baseUrl + '/admin/auth/Create'; // Replace '/finance-admin-users' with the appropriate endpoint
    console.log(data);
    try {
      const res = await this.http.post<any>(url, data).toPromise();
      return res;
    } catch (error) {
      // Handle error if needed
      throw error;
    }
  }
  
  

  saveUser(user: any): void {
    const userJson = JSON.stringify(user);
    localStorage.setItem('karavan-user', userJson);
    console.log('====================================');
    console.log(user);
    console.log('====================================');
  }
  

  getToken(): string {
      this.token = localStorage.getItem('karavanToken') as string;
      return this.token;
  }

   isAuthenticated(): boolean {
     const token = this.getToken();
     return !!token;
   }
}
