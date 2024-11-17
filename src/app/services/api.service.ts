import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, Product, User } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  /**
   * HTTP client for get items
   * @param path API path
   * @returns items
   */
  getItems<T extends Category | Product | User>(path: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}/${path}`);
  }

  /**
   * HTTP client for get item by ID
   * @param path API path
   * @returns item
   */
  getItem<T extends Category | Product | User>(
    path: string,
    id: string
  ): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${path}/${id}`);
  }

  /**
   * HTTP client for create item
   * @param path API path
   * @returns item
   */
  createItem<T extends Category | Product | User>(
    path: string,
    data: T
  ): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${path}`, data);
  }

  /**
   * HTTP client for update item by ID
   * @param path API path
   * @returns item
   */
  updateItem<T extends Category | Product | User>(
    path: string,
    id: string,
    data: T
  ): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${path}/${id}`, data);
  }

  /**
   * HTTP client for delete item by ID
   * @param path API path
   * @returns item
   */
  deleteItem<T extends Category | Product | User>(
    path: string,
    id: string
  ): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${path}/${id}`);
  }
}
