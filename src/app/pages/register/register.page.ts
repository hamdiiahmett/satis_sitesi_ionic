import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Authentication } from '../../authentication';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {

  kayitFormu!: FormGroup;

  strongPasswordRegex: RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{6,}$/;

  constructor(
    private formBuilder: FormBuilder,
    private authService: Authentication,
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.kayitFormu = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.pattern(this.strongPasswordRegex)]]
    });
  }

  get email() { return this.kayitFormu.get('email'); }
  get password() { return this.kayitFormu.get('password'); }
  get firstName() { return this.kayitFormu.get('firstName'); }
  get lastName() { return this.kayitFormu.get('lastName'); }
  get username() { return this.kayitFormu.get('username'); }

  kayitOl() {
    if (this.kayitFormu.valid) {
      this.authService.register(this.kayitFormu.value).subscribe(
        async (res) => {
          const alert = await this.alertController.create({
            header: 'Başarılı',
            message: 'Kayıt işlemi tamamlandı! Giriş yapabilirsiniz.',
            buttons: ['Tamam']
          });
          await alert.present();
          await alert.onDidDismiss();
          this.router.navigateByUrl('/login');
        },
        async (err) => {
          const alert = await this.alertController.create({
            header: 'Hata',
            message: 'Kayıt başarısız.',
            buttons: ['Tamam']
          });
          await alert.present();
        }
      );
    } else {
      this.kayitFormu.markAllAsTouched();
    }
  }
}