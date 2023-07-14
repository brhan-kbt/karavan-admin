
export interface Product {
    productId: number;
    quantity:number;
    productName: string;
    productCode:string;
    productDescription: string;
    imagePath: string;
    productSubCategory: string;
    productCategory: string;
    categoryId:number;
    subCategoryId:number;
    active:boolean;
    requireExtra:boolean;
    totalOrdered:number;
    unitPrice:number;
    mainIngredients: string;
    rating: number;
    discount:number;
    productPoint: number;
}