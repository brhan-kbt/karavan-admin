import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, map } from 'rxjs';
import { Product } from 'src/app/models/product';
import { environment } from 'src/environments/environment';
import { WebsocketService } from '../web-socket/web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl: string = `${environment.apiUrl}/api/Product`;
  popularProductUrl: string = `${environment.apiUrl}/api`;
  cache: { [key: string]: Product | undefined } = {}; // Internal cache object
  private cachedProduct: any;
  private cachedSProduct: any;

  private cachedProductList$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private cachedSeasonalProductList$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  // Expose it as an observable
  public cachedProductListObservable$: Observable<any> = this.cachedProductList$.asObservable();
  public cachedSeasonalProductListObservable$: Observable<any> = this.cachedSeasonalProductList$.asObservable();

  constructor(private http: HttpClient, private webSocketService:WebsocketService) {
    webSocketService.startConnection();
    this.registerEventHandlers();

  }

  private registerEventHandlers() {
    // Ensure that the hubConnection is initialized before calling 'on'
    const hubConnection = this.webSocketService.getHubConnection();
    console.log('Hub Connection Out: ', hubConnection);
    if (hubConnection) {
    console.log('Hub Connection In: ', hubConnection);

      hubConnection.on('ProductUpdated', (product: any) => {
        // Handle product updates here
        // this.updateCachedProductList(product);
        this.updateCachedProductList(product);

        console.log('Received product update:', product);
      });

      hubConnection.on('ProductAvailabilityUpdated', (product: any) => {
        // Handle product updates here
        // this.updateCachedProductCat(product); // Call a function to update cachedProductCat
        this.updateCachedProductListAvailablity(product);
        console.log('ProductAvailability update:', product);
      });

      hubConnection.on('PaymentStatusUpdate', (product: any) => {
        // Handle product updates here
        console.log('PaymentStatusUpdate update:', product);
      });


      hubConnection.on('OrderableProduct', (product: any) => {
        // Handle product updates here
        this.updateCachedProductList(product);

        console.log('OrderableProduct update add to category:', product);
      });


      hubConnection.on('NotOrderableProduct', (product: any) => {
        this.updateCachedProductListNotOrderable(product);

        // Handle product updates here

        console.log('NotOrderableProduct update remove from category:', product);
      });

      hubConnection.on('ProductCreated', (product: any) => {
        // Handle product creations here
        this.updateCachedProductListAdd(product);
        console.log('Received product creation:', product);
      });
    }
  }
  async getProducts() {
    const url = this.baseUrl + '/list'
    const cacheKey = 'products';
    if (this.cache[cacheKey]) {
      console.log('From Cache');
      return this.cache[cacheKey]; // Return cached data
    } else {
      const res = await this.http.get<any>(url).toPromise();
      this.cache[cacheKey] = res; // Store data in cache
      this.cachedProduct=res;
      this.cachedProductList$.next(res);
      console.log('From Api', res)
      return res;
    }
  }


  async getSeasonalProducts() {
    const url = this.popularProductUrl + '/PopularProduct?products=4'
    const cacheKey = 'seasonalProducts';
    if (this.cache[cacheKey]) {
      console.log('From Cache');
      return this.cache[cacheKey];
    } else {
      try {
        const res = await this.http.get<any>(url).toPromise();
        this.cache[cacheKey] = res; // Store data in cache
        this.cachedSProduct=res;
        this.cachedSeasonalProductList$.next(res);
        console.log('From Api', res)
        return res;
      } catch (error) {
        console.log(error)
      }

    }
  }

 async getProdBySubCategory(id:any){
   let prod = await this.getProducts();
   const filtered= prod.data.filter((data:any)=>data.subCategoryId===id);
   return filtered;

  }

  async getProdBySubCategoryFresh(id:any){
    const cacheKey = 'products';
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

  async saveProduct(data: Product) {
    const url = this.baseUrl + '/create'
    console.log(data);
    const res = await this.http.post<Product>(url, data).toPromise();
    return res;
  }

  async saveSeasonalProduct(data: Product) {
    const url = this.popularProductUrl + '/PopularProduct/create-seasonal-products'
    console.log(data);
    const res = await this.http.post<Product>(url, data).toPromise();
    return res;
  }

  async getProductById(id: number) {
    const cacheKey = `product_${id}`;
    if (this.cache[cacheKey]) {
      return this.cache[cacheKey]; // Return cached data
    } else {
      const res = await this.http.get<Product>(`${this.baseUrl}/${id}`).toPromise();
      this.cache[cacheKey] = res; // Store data in cache
      return res;
    }
  }

  async updateProduct(data: Product, id: number) {
    const url = this.baseUrl +'/update'
    const res = await this.http.put<Product>(`${url}/${id}`, data).toPromise();
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


   deleteSeasonalProduct(id:any){
     const url = this.popularProductUrl + '/PopularProduct/delete-seasonal-product'
            return this.http.delete<any>(`${url}/${id}`)
             .pipe(map((res:Product)=>{
               return res;
      }))
   }

  changePopularityType(data: any) {
    const url = this.popularProductUrl + '/PopularProduct/update-popularity-setting';
    return this.http.put<any>(`${url}`, data).pipe(map((res:Product)=>{
      return res;
    }))
  }


  private updateCachedProductList(updatedProduct: any): void {
    console.log('Updated Product Cat:', updatedProduct);
    console.log('Cached Product Cat:', this.cachedProduct.data);
    if (this.cachedProduct) {
      // Iterate through categories and subcategories to find and update the product
          const updatedProductIndex = this.cachedProduct.data.findIndex((product: any) => product.id === updatedProduct.id);
          console.log('Updated Product Index:', updatedProductIndex);
          console.log('Updated Product:', updatedProduct);

          if (updatedProductIndex !== -1) {
            // Update the product in the subcategory
            this.cachedProduct.data[updatedProductIndex] = updatedProduct;
            console.log('Updated.');
          }

          this.cachedProductList$.next(this.cachedProduct);
      // Notify subscribers about the update by emitting the entire cache[cacheKey]
    }
  }

  private updateCachedProductListAvailablity(updatedProduct: any): void {
    console.log('Updated Product Cat:', updatedProduct);
    console.log('Cached Product Cat:', this.cachedProduct.data);
    if (this.cachedProduct) {
      // Iterate through categories and subcategories to find and update the product
      for (const product of this.cachedProduct.data) {
        if (product.id === updatedProduct.productId) {
          const branchProduct = product.branchProducts.find((bp: any) => bp.id === updatedProduct.id && bp.branch.id==updatedProduct.branch.id);

          console.log('Updated Product Index:', branchProduct);
          console.log('Updated Product:', updatedProduct);

          if (branchProduct) {
            // Update maxThreshold and isAvailable for the branchProduct
            branchProduct.maxThreshold = updatedProduct.maxThreshold;
            branchProduct.isAvailable = updatedProduct.isAvailable;
            console.log('Updated.');
          }
        }
      }
              this.cachedProductList$.next(this.cachedProduct);
      // Notify subscribers about the update by emitting the entire cache[cacheKey]
    }
  }
  private updateCachedProductListAdd(updatedProduct: any): void {
    console.log('Updated Product Cat:', updatedProduct);
    console.log('Cached Product Cat:', this.cachedProduct.data);
    if (this.cachedProduct) {
      // Iterate through categories and subcategories to find and update the product
          const updatedProductIndex = this.cachedProduct.data.findIndex((product: any) => product.id === updatedProduct.id);
          console.log('Updated Product Index:', updatedProductIndex);
          console.log('Updated Product:', updatedProduct);

          if (updatedProductIndex !== -1) {
            // Update the product in the subcategory
            console.log('Product Already Exist.');
          }
          else{
            this.cachedProduct.data.push(updatedProduct);
            console.log('Added Product:', updatedProduct);
          }

          this.cachedProductList$.next(this.cachedProduct);
      // Notify subscribers about the update by emitting the entire cache[cacheKey]
    }
  }

  private updateCachedProductListNotOrderable(updatedProductId: any): void {
    console.log('Updated Product Cat:', updatedProductId);
    console.log('Cached Product Cat:', this.cachedProduct.data);
    if (this.cachedProduct) {
      // Iterate through categories and subcategories to find and update the product
          const updatedProductIndex = this.cachedProduct.data.findIndex((product: any) => product.id === updatedProductId);
          const updatedProduct = this.cachedProduct.data.find((product: any) => product.id === updatedProductId);
          console.log('Updated Product Index:', updatedProductIndex);
          console.log('Updated Product:', updatedProductId);

          if (updatedProductIndex !== -1) {
            // Update the product in the subcategory
            const data = { ...updatedProduct, orderable: !updatedProduct.orderable };
            this.cachedProduct.data[updatedProductIndex] = data;
            console.log('Updated.');
          }

          this.cachedProductList$.next(this.cachedProduct);
      // Notify subscribers about the update by emitting the entire cache[cacheKey]
    }
  }


  getData() {
    return [
        {
            itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria1s.jpg',
            alt: 'Description for Image 1',
            title: 'Title 1'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria2.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria2s.jpg',
            alt: 'Description for Image 2',
            title: 'Title 2'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria3.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria3s.jpg',
            alt: 'Description for Image 3',
            title: 'Title 3'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria4.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria4s.jpg',
            alt: 'Description for Image 4',
            title: 'Title 4'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria5.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria5s.jpg',
            alt: 'Description for Image 5',
            title: 'Title 5'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria6.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria6s.jpg',
            alt: 'Description for Image 6',
            title: 'Title 6'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria7.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria7s.jpg',
            alt: 'Description for Image 7',
            title: 'Title 7'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria8.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria8s.jpg',
            alt: 'Description for Image 8',
            title: 'Title 8'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria9.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria9s.jpg',
            alt: 'Description for Image 9',
            title: 'Title 9'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria10.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria10s.jpg',
            alt: 'Description for Image 10',
            title: 'Title 10'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria11.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria11s.jpg',
            alt: 'Description for Image 11',
            title: 'Title 11'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria12.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria12s.jpg',
            alt: 'Description for Image 12',
            title: 'Title 12'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria13.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria13s.jpg',
            alt: 'Description for Image 13',
            title: 'Title 13'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria14.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria14s.jpg',
            alt: 'Description for Image 14',
            title: 'Title 14'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria15.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria15s.jpg',
            alt: 'Description for Image 15',
            title: 'Title 15'
        }
    ];
}

getImages() {
    return Promise.resolve(this.getData());
}

}
