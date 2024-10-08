import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private urlApi = 'https://restcountries.com/v3.1/all';
  paises: any = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.obtenerPaises();
  }

  obtenerPaises() 
  {
    return this.http.get(this.urlApi);
  }
}
