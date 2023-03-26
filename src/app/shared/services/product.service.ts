import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Product } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = environment.productsApiBaseUrl;

  constructor(
    private http: HttpClient
  ) { }

  getProducts(): Observable<Product[]> {
    const url = this.baseUrl + "produtos";
    return this.http.get<Product[]>(url);
  }

  deleteProduct(id: string): Observable<Object> {
    const url = this.baseUrl + id;
    return this.http.delete<Object>(url);
  }

  createProduct(product: Product): Observable<Object> {
    const url = this.baseUrl + "produtos";
    return this.http.post<Object>(url, product);
  }

  getProduct(id: string): Observable<Product> {
    const url = this.baseUrl + id;
    return this.http.get<Product>(url);
  }

  updateProduct(product: Product, id: string): Observable<Object> {
    const url = this.baseUrl + id;
    return this.http.put<Object>(url, product);
  }
}
