import { Component, OnInit } from '@angular/core';
import { Authentication } from '../../authentication';
import { Preferences } from '@capacitor/preferences';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sepet',
  templateUrl: './sepet.page.html',
  styleUrls: ['./sepet.page.scss'],
  standalone: false,
})
export class SepetPage implements OnInit {

  sepetUrunleri: any[] = [];
  toplamTutar: number = 0;
  toplamAdet: number = 0;

  constructor(
    private authService: Authentication,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.sepetiGetir();
  }

  async sepetiGetir() {
    const userId = await this.authService.getUserId();

    // Get local items
    const { value } = await Preferences.get({ key: 'sepetim' });
    const localItems = value ? JSON.parse(value) : [];

    if (userId) {
      this.authService.getCart(userId).subscribe(
        (res: any) => {
          console.log("Sepet Verisi (Yeni):", res);

          let apiItems = [];

          if (res && res.carts && res.carts.length > 0) {
            apiItems = res.carts[0].products;
          } else if (res && res.products) {
            apiItems = res.products;
          }

          this.sepetUrunleri = [...apiItems, ...localItems];

          this.hesaplaToplam();
        },
        (err) => {
          console.log("Hata:", err);
          this.sepetUrunleri = localItems;
          this.hesaplaToplam();
        }
      );
    } else {
      this.sepetUrunleri = localItems;
      this.hesaplaToplam();
    }
  }

  hesaplaToplam() {
    this.toplamTutar = this.sepetUrunleri.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
    this.toplamAdet = this.sepetUrunleri.reduce((acc, item) => acc + (item.quantity || 1), 0);
  }

  async sil(urun: any) {
    this.sepetUrunleri = this.sepetUrunleri.filter(i => i !== urun);
    this.hesaplaToplam();

    const localItems = this.sepetUrunleri.filter(i => i.isLocal === true);

    await Preferences.set({
      key: 'sepetim',
      value: JSON.stringify(localItems)
    });
  }

  async sepetiTemizle() {
    if (this.sepetUrunleri.length === 0) return;

    const alert = await this.alertController.create({
      header: 'Sepeti Temizle',
      message: 'Sepetinizdeki tüm ürünleri silmek istediğinize emin misiniz?',
      buttons: [
        {
          text: 'İptal',
          role: 'cancel'
        },
        {
          text: 'Evet, Sil',
          handler: async () => {
            // View temizle
            this.sepetUrunleri = [];
            this.hesaplaToplam();

            await Preferences.remove({ key: 'sepetim' });
          }
        }
      ]
    });

    await alert.present();
    await alert.present();
  }

  async satinAl() {
    const { value: token } = await Preferences.get({ key: 'ionicAuth_usertoken' });

    if (!token) {
      const alert = await this.alertController.create({
        header: 'Giriş Yapmalısınız',
        message: 'Satın alma işlemi için lütfen giriş yapın veya kayıt olun.',
        buttons: [
          {
            text: 'İptal',
            role: 'cancel'
          },
          {
            text: 'Kayıt Ol',
            handler: () => {
              this.router.navigate(['/register']);
            }
          },
          {
            text: 'Giriş Yap',
            handler: () => {
              this.router.navigate(['/login']);
            }
          }
        ]
      });
      await alert.present();
      return;
    }

    const alert = await this.alertController.create({
      header: 'Başarılı',
      message: 'Siparişiniz alınmıştır.',
      buttons: ['Tamam']
    });
    await alert.present();

    this.sepetUrunleri = [];
    this.hesaplaToplam();
    await Preferences.remove({ key: 'sepetim' });
  }
}