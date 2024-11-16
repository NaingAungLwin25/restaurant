import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getItems(path: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${path}`);
  }

  getItem(path: string, id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${path}/${id}`);
  }

  createItem(path: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${path}`, data);
  }

  updateItem(path: string, id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${path}/${id}`, data);
  }

  deleteItem(path: string, id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${path}/${id}`);
  }
}
