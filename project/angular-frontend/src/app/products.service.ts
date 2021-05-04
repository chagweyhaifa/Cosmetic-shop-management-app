import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from './shared/models/product.model';

const baseUrl = 'http://localhost:8000';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products = [];
  dataDeleted = new EventEmitter<string>();

  constructor(private http: HttpClient) {}

  get(id: number) {
    return this.http.get<Product>(`${baseUrl}/getProduct?id=${id}`);
  }

  create(data: Omit<Product, 'id'>) {
    return this.http.post(`${baseUrl}/addProduct`, data);
  }

  update(data: Product, image?: File) {
    return this.http.post(`${baseUrl}/editProduct`, data);
  }

  uploadPhoto(data: any) {
    return this.http.post(`${baseUrl}/files`, data);
  }

  delete(id: number) {
    return this.http.get(`${baseUrl}/deleteProduct?id=${id}`);
  }

  getAll() {
    return this.http.get<Product[]>(baseUrl);
  }
}
