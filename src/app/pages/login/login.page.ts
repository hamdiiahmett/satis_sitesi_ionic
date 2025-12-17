import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Authentication } from '../../authentication';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  uyelikBilgisi!: FormGroup;
  showPassword: boolean = false;

  constructor(
    private router: Router,
    private authServis: Authentication,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.uyelikBilgisi = this.formBuilder.group({
      username: ['emilys', [Validators.required]],
      password: ['emilyspass', [Validators.required]]
    });
  }

  get username() { return this.uyelikBilgisi.get('username'); }
  get password() { return this.uyelikBilgisi.get('password'); }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  girisYap() {
    if (this.uyelikBilgisi.valid) {
      this.authServis.login(this.uyelikBilgisi.value).subscribe(
        async (cevap: any) => {
          this.authServis.tokenKaydet(cevap.token, cevap.id);

          const toast = await this.toastController.create({
            message: 'Giriş başarılı! Yönlendiriliyorsunuz...',
            duration: 1000, 
            color: 'success',
            position: 'top',
            icon: 'checkmark-circle'
          });
          await toast.present();

          await toast.onDidDismiss();
          this.router.navigateByUrl('/home');
        },
        async (hata) => {
          const alert = await this.alertController.create({
            header: 'Hata',
            message: 'Kullanıcı adı veya şifre hatalı!',
            buttons: ['Tamam']
          });
          await alert.present();
        }
      )
    } else {
      this.uyelikBilgisi.markAllAsTouched();
    }
  }
}