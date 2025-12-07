import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private baseUrl = 'https://dummyjson.com'; 

  constructor(private http: HttpClient) { }

  login(data: any) {
    return this.http.post(this.baseUrl + '/auth/login', data);
  }

  register(data: any) {
    return this.http.post(this.baseUrl + '/users/add', data);
  }

  getProducts() {
    return this.http.get(this.baseUrl + '/products');
  }

  getUserCart(userId: number) {
    return this.http.get(this.baseUrl + '/carts/user/' + userId);
  }

  async setToken(token: any) {
    await Preferences.set({
      key: 'myApp_token',
      value: JSON.stringify(token),
    });
  }

  async getToken() {
    const { value } = await Preferences.get({ key: 'myApp_token' });
    return value ? JSON.parse(value) : null;
  }

  async removeToken() {
    await Preferences.remove({ key: 'myApp_token' });
  }
}