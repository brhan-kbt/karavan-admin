import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {
  baseUrl: string = `http://196.189.119.123/api/SubCategory`;
  cache: { [key: string]: any | undefined } = {}; // Internal cache object

  constructor(private http: HttpClient) { }

  async getAll() {
    console.log('We\'re here')
    const url = this.baseUrl + '/list'
    const cacheKey = 'sub-categories';
    if (this.cache[cacheKey]) {
      console.log('Sub Category From Cache');
      return this.cache[cacheKey]; // Return cached data
    } else {
      const res = await this.http.get<any>(url).toPromise();
      this.cache[cacheKey] = res.data; // Store data in cache
      console.log('Sub Category From Api', this.cache[cacheKey])
      return res.data;
    }
  }


  async save(data: any) {
    console.log(data);
    const res = await this.http.post<any>(this.baseUrl, data).toPromise();
    return res;
  }

  async getById(id: number) {
    const url = this.baseUrl + '/list'
    const cacheKey = `sub-categories`;
    console.log(id)
    const cachedData = this.cache[cacheKey];

    if (cachedData) {
      console.log('All Subcategory From Cache');
      const matchingSubCategories = this.findSubCategoriesByCategoryId(id, cachedData);
      if (matchingSubCategories.length > 0) {
        return matchingSubCategories; // Return matching subcategories from cache
      }
    }

    // If subcategories not found in cache, send HTTP request
    console.log('All Subcategory From API');
    const res = await this.http.get<any>(`${url}`).toPromise();
    console.log(res.data)
    let subcategories=res.data.filter((subcategory: any) => subcategory.categoryId == id);;
    return subcategories;
  }

  private findSubCategoriesByCategoryId(id: number, data: any) {

   let allsubCategories = data.filter((subcategory: any) => subcategory.categoryId == id);

    return allsubCategories;
  }





  async updateProduct(data: any, id: number) {
    const res = await this.http.put<Product>(`${this.baseUrl}/${id}`, data).toPromise();
    return res;
  }

  // deleteProduct(id:number){
  //   return this.http.delete<Product>("http://localhost:3000/products"+id)
  //           .pipe(map((res:Product)=>{
  //             return res;
  //           }))
  // }

}
