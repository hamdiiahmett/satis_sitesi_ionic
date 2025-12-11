# 🛒 Ionic E-Ticaret Uygulaması 

Bu proje, Mobil Programlama dersi vize gereksinimlerini karşılamak üzere Ionic Framework (Angular) kullanılarak geliştirilmiştir.

## ✨ Kullanılan Teknolojiler

* **Framework:** Angular 14+
* **Mobil Çatı:** Ionic Framework 6
* **API:** DummyJSON REST API (https://dummyjson.com/)
* **Yerel Depolama:** @capacitor/preferences

## 🔑 Ana Özellikler ve Endpoint'ler

Proje, DummyJSON API'sinde belirtilen endpoint'leri kullanarak aşağıdaki işlevleri sunmaktadır:

1.  **Giriş Yapma (Login):** Kullanıcı adı ve şifre ile token alma işlemi.
    * *Endpoint:* `/auth/login`
2.  **Kayıt Olma (Register):** DummyJSON `users/add` servisi ile kayıt simülasyonu.
3.  **Ürün Listeleme (Home):** Tüm ürünlerin listelenmesi ve detay sayfasına yönlendirme.
    * *Endpoint:* `/products`
4.  **Ürün Detay:** Ürün ID'sine göre tek bir ürünün detayını gösterme.
5.  **Sepet Görüntüleme:** Kullanıcı ID'sine göre atanan sepetin API'den çekilmesi.
    * *Endpoint:* `/carts/user/1` (Vize için sabit ID)

## 🛠️ Kurulum ve Çalıştırma

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin:

1.  Projeyi klonlayın:
    ```bash
    git clone [https://github.com/KULLANICI_ADINIZ/REPO_ADINIZ.git](https://github.com/KULLANICI_ADINIZ/REPO_ADINIZ.git)
    ```

2.  Proje dizinine gidin ve bağımlılıkları yükleyin:
    ```bash
    cd REPO_ADINIZ
    npm install
    ```

3.  Uygulamayı tarayıcıda başlatın:
    ```bash
    ionic serve
    ```
