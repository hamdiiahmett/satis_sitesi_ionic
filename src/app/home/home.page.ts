import { Component, OnInit } from '@angular/core';
import { Authentication } from '../authentication';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  urunListesi: any[] = [];
  isLoggedIn: boolean = false;

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private router: Router,
    private authService: Authentication,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.urunleriCek();
  }

  async ionViewWillEnter() {
    const { value: token } = await Preferences.get({ key: 'ionicAuth_usertoken' });
    this.isLoggedIn = !!token;
  }

  async urunleriCek() {
    const loading = await this.loadingController.create({
      message: 'Ürünler yükleniyor...',
      spinner: 'crescent',
      duration: 5000
    });
    await loading.present();

    this.authService.getAllProducts().subscribe(
      (res: any) => {
        this.urunListesi = res.products.map((p: any) => ({ ...p, isFavorite: false }));
        
        console.log("Ürünler Geldi:", this.urunListesi);
        loading.dismiss();
      },
      (err) => {
        console.log("Hata:", err);
        loading.dismiss();
      }
    );
  }

  favorile(urun: any) {
    urun.isFavorite = !urun.isFavorite; 

    this.toastController.create({
     message: urun.isFavorite ? 'Favorilere eklendi ❤️' : 'Favorilerden çıkarıldı 💔',
      duration: 1000,
      color: 'dark',
      position: 'middle'
    }).then(toast => toast.present());
  }
  // ---------------------------------------

  yenile(event: any) {
    this.authService.getAllProducts().subscribe((res: any) => {
      this.urunListesi = res.products.map((p: any) => ({ ...p, isFavorite: false }));
      event.target.complete();
    });
  }

  async checkAuth(): Promise<boolean> {
    const { value: token } = await Preferences.get({ key: 'ionicAuth_usertoken' });
    if (!token) {
      const alert = await this.alertController.create({
        header: 'Giriş Gerekli',
        message: 'Bu işlemi yapmak için lütfen giriş yapın.',
        buttons: [
          { text: 'İptal', role: 'cancel' },
          { text: 'Giriş Yap', handler: () => this.router.navigate(['/login']) },
          { text: 'Kayıt Ol', handler: () => this.router.navigate(['/register']) }
        ]
      });
      await alert.present();
      return false;
    }
    return true;
  }

  async openCart() {
    this.router.navigate(['/sepet']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  async logout() {
    await this.authService.tokenSil();
    this.isLoggedIn = false;
    const toast = await this.toastController.create({
      message: 'Başarıyla çıkış yapıldı.',
      duration: 1500,
      color: 'dark',
      position: 'bottom'
    });
    await toast.present();
  }

  async sepeteAt(urun: any) {
    if (!(await this.checkAuth())) return;

    await this.authService.sepeteEkle(urun);
    const toast = await this.toastController.create({
      message: urun.title + ' sepete eklendi!',
      duration: 1500,
      color: 'success',
      position: 'bottom'
    });
    await toast.present();
  }
}