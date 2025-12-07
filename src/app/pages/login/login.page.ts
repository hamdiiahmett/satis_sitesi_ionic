import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Authentication } from '../../authentication';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  kullaniciVerisi: any;
  uyelikBilgisi!: FormGroup;

  gucluSifreKurali: RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{6,}$/;

  constructor(
    private router: Router,
    private authServis: Authentication,
    private formBuilder: FormBuilder,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.uyelikBilgisi = this.formBuilder.group({
      username: ['emilys', [Validators.required]],
      password: ['emilyspass', [Validators.required]]
    });
  }

  get username() { return this.uyelikBilgisi.get('username') as FormControl; }
  get password() { return this.uyelikBilgisi.get('password') as FormControl; }

  girisYap() {
    if (this.uyelikBilgisi.valid) {
      this.authServis.login(this.uyelikBilgisi.value).subscribe(
        (cevap: any) => {
          this.kullaniciVerisi = cevap;
          console.log("Giriş Başarılı:", this.kullaniciVerisi);

          this.authServis.tokenKaydet(this.kullaniciVerisi.token, this.kullaniciVerisi.id);

          this.router.navigateByUrl('/home');
        },
        async (hata) => {
          console.log(hata);
          const alert = await this.alertController.create({
            header: 'Hata',
            message: 'Kullanıcı adı veya şifre hatalı!',
            buttons: ['Tamam']
          });
          await alert.present();
        }
      )
    }
  }
}