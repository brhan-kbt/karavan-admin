import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {  map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private token!: string;
  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedInSubject.asObservable();

  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {
    // Initialize loggedIn status from local storage
    this.loggedInSubject.next(this.isAuthenticated());
  }

  login(data: any): Observable<any> {
    const url = this.baseUrl + '/admin/auth/login';
    return this.http.post<any>(url, data);
  }

  saveToken(token: string): void {
    localStorage.setItem('karavanToken', token);
    this.loggedInSubject.next(true); // Update loggedIn status
  }

  saveRefreshToken(token: string): void {
    localStorage.setItem('karavanRefreshToken', token);
  }

  saveUser(user: any): void {
    this.userSubject.next(user);
    localStorage.setItem('karavan-user', JSON.stringify(user));
  }

  getSavedUser(): any {
    if (this.userSubject.value) {
      return this.userSubject.value;
    }

    const savedUserJson = localStorage.getItem('karavan-user');
    if (savedUserJson) {
      return JSON.parse(savedUserJson);
    }

    return null;
  }

  getToken(): string {
    this.token = localStorage.getItem('karavanToken') as string;
    return this.token;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
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




}
