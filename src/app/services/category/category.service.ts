import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl: string = `http://196.189.119.123/api/Category`;
  baseSubUrl: string = `http://196.189.119.123/api/SubCategory`;
  cache: { [key: string]: any | undefined } = {}; // Internal cache object
  private selectedCategorySubject = new BehaviorSubject<any | null>(null);
  selectedCategory$ = this.selectedCategorySubject.asObservable();
  subCat:any;

  private selectedCategorySubCategorySubject = new BehaviorSubject<any | null>(null);
  selectedCategorySubCategory$ = this.selectedCategorySubCategorySubject.asObservable();

  constructor(private http: HttpClient) { }

  async getAll() {
    const url = this.baseUrl + '/admin-list'
    const cacheKey = 'categories';
    const cacheKey2 = 'subCategories';
    if (this.cache[cacheKey]) {
      console.log('Category From Cache');
      return this.cache[cacheKey]; // Return cached data
    } else {
      const res = await this.http.get<any>(url).toPromise();
      this.cache[cacheKey] = res.data; // Store data in cache
      console.log('Category From Api', res.data)
      return res.data;
    }
  }
  async getSubCat() {
    try {
      const res = await this.getAll();
      this.subCat = res;

      const allSubcategories: any[] = [];

      this.subCat.forEach((category: any) => {
        if (category.subcategories && Array.isArray(category.subcategories)) {
          allSubcategories.push(...category.subcategories);
        }
      });

      return allSubcategories;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  async getAllSubC() {
    const url = this.baseSubUrl + '/list'
    const cacheKey = 'sub_categories';
    if (this.cache[cacheKey]) {
      console.log('Category From Cache');
      return this.cache[cacheKey]; // Return cached data
    } else {
      const res = await this.http.get<any>(url).toPromise();
      this.cache[cacheKey] = res.data; // Store data in cache
      console.log('Category From Api', res.data)
      return res.data;
    }
  }
  setSelectedCategory(category: any | null) {
    this.selectedCategorySubject.next(category);
  }


  setSelectedCategorySubCategory(category: any | null) {
    this.selectedCategorySubCategorySubject.next(category);
  }


  async saveCategory(data: any) {
    const url = this.baseUrl + '/create'
    console.log(data);
    const res = await this.http.post<any>(url, data).toPromise();
    return res;
  }

  async getById(id: number) {
    const cacheKey = `category_${id}`;
    if (this.cache[cacheKey]) {
      return this.cache[cacheKey]; // Return cached data
    } else {
      const res = await this.http.get<any>(`${this.baseUrl}/${id}`).toPromise();
      this.cache[cacheKey] = res.data; // Store data in cache
      return res.data;
    }
  }

  async updateProduct(data: any, id: number) {
    const res = await this.http.put<any>(`${this.baseUrl}/${id}`, data).toPromise();
    return res;
  }

  // deleteProduct(id:number){
  //   return this.http.delete<Product>("http://localhost:3000/products"+id)
  //           .pipe(map((res:Product)=>{
  //             return res;
  //           }))
  // }

}
