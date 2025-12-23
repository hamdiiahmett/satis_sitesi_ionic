# 🛒 Ionic Modern E-Ticaret Uygulaması

Bu proje, Mobil Programlama dersi vize gereksinimlerini karşılamak ve modern mobil UI trendlerini (Glassmorphism, Animasyonlar) uygulamak amacıyla **Ionic Framework (Angular)** kullanılarak geliştirilmiştir.

Uygulama, kullanıcı dostu arayüzü, akıcı geçişleri ve gerçek zamanlı API bağlantıları ile tam kapsamlı bir e-ticaret deneyimi sunar.

---

## 📱 Ekran Görüntüleri

Projenin modern tasarımından kareler:

| Giriş Yap (Login) | Kayıt Ol (Register) | Ana Sayfa (Home) | Sepetim (Cart) |
| :---: | :---: | :---: | :---: |
| <img src="screenshots/login.png" width="200"> | <img src="screenshots/register.png" width="200"> | <img src="screenshots/home.png" width="200"> | <img src="screenshots/cart.png" width="200"> |

---

## ✨ Öne Çıkan Özellikler

Bu proje standart gereksinimlerin ötesine geçerek şu özellikleri barındırır:

* **🎨 Modern UI/UX:**
    * **Glassmorphism Tasarım:** Login ve Register sayfalarında buzlu cam efektleri.
    * **Skeleton Loading:** Veriler yüklenirken kullanıcıya gri iskelet ekran gösterimi.
    * **Staggered Animations:** Ürünlerin ve liste elemanlarının sırayla, kayarak ekrana gelmesi.
    * **Haptic Feedback:** Sepete ekleme ve favorileme işlemlerinde titreşim geri bildirimi.
* **🔐 Güvenlik & Doğrulama:**
    * Reactive Forms ile anlık form validasyonu (Email kontrolü, güçlü şifre regex'i).
    * Şifre Göster/Gizle özelliği.
    * Token bazlı oturum yönetimi (`@capacitor/preferences` ile).
* **🛒 Sepet Yönetimi:**
    * Yerel (Local) ve API tabanlı sepet birleştirme mantığı.
    * Dinamik toplam tutar hesaplama.
    * Ürün silme animasyonları.

## 🛠️ Kullanılan Teknolojiler

* **Framework:** Angular 14+
* **Mobil Çatı:** Ionic Framework 6
* **Dil:** TypeScript & SCSS
* **API:** [DummyJSON](https://dummyjson.com/) (Ürün ve Auth işlemleri için)
* **Veri Saklama:** Capacitor Preferences (Local Storage)

## 🔑 Endpoint Kullanımı

Proje, DummyJSON API'si üzerinde aşağıdaki servisleri kullanır:

1.  **Auth:** `/auth/login` (Token alma)
2.  **Kayıt:** `/users/add` (Simülasyon)
3.  **Ürünler:** `/products` (Tüm ürünleri çekme)
4.  **Sepet:** `/carts/user/1` (Kullanıcıya özel sepeti getirme)

---

## 🚀 Kurulum ve Çalıştırma

Projeyi kendi bilgisayarınızda çalıştırmak için:

1.  **Projeyi Klonlayın:**
    ```bash
    git clone [https://github.com/KULLANICI_ADINIZ/REPO_ADINIZ.git](https://github.com/KULLANICI_ADINIZ/REPO_ADINIZ.git)
    cd mobilVize
    ```

2.  **Bağımlılıkları Yükleyin:**
    ```bash
    npm install
    ```

3.  **Uygulamayı Başlatın:**
    ```bash
    ionic serve
    ```
