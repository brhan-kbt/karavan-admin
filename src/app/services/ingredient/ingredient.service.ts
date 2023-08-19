import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  baseUrl: string = `${environment.apiUrl}/api/Ingredient`;
  cache: { [key: string]: any | undefined } = {}; // Internal cache object

  constructor(private http: HttpClient) { }

  async getIngredients() {
    const url = this.baseUrl + '/list'
    const cacheKey = 'ingredients';
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

 async getProdBySubCategory(id:any){
   let prod = await this.getIngredients();
   const filtered= prod.data.filter((data:any)=>data.subCategoryId===id);
   return filtered;

  }

  async getProdBySubCategoryFresh(id:any){
    const cacheKey = 'ingredients';
    const url = this.baseUrl + '/list'
    const res = await this.http.get<any>(url).toPromise();
      this.cache[cacheKey] = res;
      console.log('From Api', res)
    const filtered= res.data.filter((data:any)=>data.subCategoryId===id);
    return filtered;

   }

  async getProds() {
    const url = this.baseUrl + '/list'
    const res = await this.http.get<any>(url).toPromise();
    console.log('From Api', res)
    return res;
}

  async saveIngredient(data: any) {
    const url = this.baseUrl + '/create'
    console.log(data);
    const res = await this.http.post<any>(url, data).toPromise();
    return res;
  }

  async getIngredientById(id: number) {
    const cacheKey = `ingredient_${id}`;
    if (this.cache[cacheKey]) {
      return this.cache[cacheKey]; // Return cached data
    } else {
      const res = await this.http.get<any>(`${this.baseUrl}/${id}`).toPromise();
      this.cache[cacheKey] = res; // Store data in cache
      return res;
    }
  }

  async updateIngredient(data: any, id: number) {
    const url = this.baseUrl +'/update'
    const res = await this.http.put<any>(`${url}/${id}`, data).toPromise();
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

}

