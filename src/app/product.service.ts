import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  public getTheProductList(){
    return this.http.get("http://localhost:8088/api/v1/prodcuts")
  }
}
