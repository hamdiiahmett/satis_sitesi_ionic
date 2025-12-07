import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Authentication } from '../authentication';
import { ToastController, AlertController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
  standalone: false,
})
export class ProductDetailPage implements OnInit {

  urunDetay: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: Authentication,
    private toastController: ToastController,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.authService.getProduct(id).subscribe((res) => {
      this.urunDetay = res;
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

  async sepeteEkle() {
    if (!(await this.checkAuth())) return;

    const { value } = await Preferences.get({ key: 'sepetim' });
    let sepet = value ? JSON.parse(value) : [];

    const itemToAdd = { ...this.urunDetay, isLocal: true };
    sepet.push(itemToAdd);

    await Preferences.set({
      key: 'sepetim',
      value: JSON.stringify(sepet)
    });

    console.log("Sepete eklendi:", itemToAdd);
    const toast = await this.toastController.create({
      message: 'Ürün sepete eklendi!',
      duration: 1500,
      position: 'bottom',
      color: 'success'
    });
    await toast.present();
  }
}
