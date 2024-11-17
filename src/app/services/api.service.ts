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

  getItems<T extends Category | Product | User>(path: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}/${path}`);
  }

  getItem<T extends Category | Product | User>(
    path: string,
    id: string
  ): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${path}/${id}`);
  }

  createItem<T extends Category | Product | User>(
    path: string,
    data: T
  ): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${path}`, data);
  }

  updateItem<T extends Category | Product | User>(
    path: string,
    id: string,
    data: T
  ): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${path}/${id}`, data);
  }

  deleteItem<T extends Category | Product | User>(
    path: string,
    id: string
  ): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${path}/${id}`);
  }
}
