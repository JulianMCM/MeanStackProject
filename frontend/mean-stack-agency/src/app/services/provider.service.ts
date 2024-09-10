import { Injectable, Provider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProviderClass } from '../models/providers.class';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProviderService {
  //URL endpoint to our express app
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  //Get all records
  getProviders(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // GET one record
  getProvider(id: number): Observable<any> {
    return this.http.get(this.apiUrl + id);
  }

  // PUT - update a record
  updateProvider(id: number, newProvider: ProviderClass): Observable<ProviderClass>{
    return this.http.put<ProviderClass>(this.apiUrl + id, newProvider);
  }

  // POST - add a new record
  addProvider(newProvider: ProviderClass): Observable<any> {
    return this.http.post(this.apiUrl, newProvider);
  }

  // DELETE a single record
  deleteProvider(id: number): Observable<any>{
    return this.http.delete(this.apiUrl + id);
  }
}