import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AvaialablityService {
   baseUrl:string= environment.apiUrl;

  constructor( private http:HttpClient ) { }

  async updateAvailability(data: any) {
    const url = this.baseUrl + '/api/BranchProduct/update'
    if(data && data.id){
    const res = await this.http.put<any>(`${url}/${data.id}`, data).toPromise();
    return res;
    }else{
      return 'Failed to update Status';
    }
  }

}
