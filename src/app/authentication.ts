import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class Authentication {

  backend = "https://dummyjson.com/";

  constructor(private http: HttpClient) { }

  login(veri: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.backend + 'auth/login', veri, { headers });
  }

  register(veri: any) {
   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.backend + 'users/add', veri, { headers });
  }

  getAllProducts() {
    return this.http.get<any>(this.backend + 'products');
  }

  getProduct(id: any) {
    return this.http.get(this.backend + 'products/' + id);
  }

  getCart(userId: any) {
    const id = userId ? userId : 1; 
    return this.http.get(this.backend + 'carts/user/' + id);
  }

  async sepeteEkle(urun: any) {
    const { value } = await Preferences.get({ key: 'sepetim' });
    let sepet = value ? JSON.parse(value) : [];

    sepet.push(urun);

    await Preferences.set({
      key: 'sepetim',
      value: JSON.stringify(sepet)
    });
  }
  async tokenKaydet(token: any, userId: any) {
    await Preferences.set({
      key: 'ionicAuth_usertoken',
      value: JSON.stringify(token),
    });
    await Preferences.set({
    key: 'ionicAuth_userId',
      value: JSON.stringify(userId),
    });
  }
  async getUserId() {
    const { value } = await Preferences.get({ key: 'ionicAuth_userId' });
    return value ? JSON.parse(value) : null;
  }
  async tokenSil() {
    await Preferences.remove({ key: 'ionicAuth_usertoken' });
    await Preferences.remove({ key: 'ionicAuth_userId' });
  }
}