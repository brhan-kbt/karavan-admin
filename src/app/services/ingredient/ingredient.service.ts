import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  baseUrl: string = `${environment.apiUrl}/api`;
  cache: { [key: string]: any | undefined } = {}; // Internal cache object

  constructor(private http: HttpClient) { }

  async saveIngredients(data: any) {
    const url = this.baseUrl + '/ProductIngredient/add-ingredients'
    console.log(data);
    const res = await this.http.post<any>(url, data).toPromise();
    return res;
  }
  async getIngredients() {
    const url = this.baseUrl + '/Ingredient';
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

  async getIngs() {
    const url = this.baseUrl + '/Ingredient';
    const cacheKey = 'ingredients';
      const res = await this.http.get<any>(url).toPromise();
      this.cache[cacheKey] = res; // Store data in cache
      console.log('From Api', res)
      return res;
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
    const url = this.baseUrl + '/Ingredient/create'
    console.log(data);
    const res = await this.http.post<any>(url, data).toPromise();
    return res;
  }

  async getIngredientById(id: number) {
    const url = this.baseUrl + 'Ingredient/'
    const cacheKey = `ingredient_${id}`;
    if (this.cache[cacheKey]) {
      return this.cache[cacheKey]; // Return cached data
    } else {
      const res = await this.http.get<any>(`${url}/${id}`).toPromise();
      this.cache[cacheKey] = res; // Store data in cache
      return res;
    }
  }

  async updateIngredient(data: any, id: number) {
    const url = this.baseUrl +'/Ingredient/update'
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

  deleteIngredient(id:any){
    const url = this.baseUrl + '/delete';
    return this.http.delete<any>(`${url}/${id}`).pipe(
      map((res: any) => {
        console.log('====================================');
        return res;

      })
    );
   }

}

