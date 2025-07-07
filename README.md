# Renart Case Study

Bu proje, bir ürün listeleme ve filtreleme uygulamasıdır.  
**Backend** Node.js, Express ve Prisma ile yazılmıştır.  
**Frontend** ise React ile geliştirilmiştir.

---

## İçindekiler

- [Özellikler](#özellikler)
- [Kurulum](#kurulum)
  - [Backend Kurulumu](#backend-kurulumu)
  - [Frontend Kurulumu](#frontend-kurulumu)
- [Geliştirme Ortamı](#geliştirme-ortamı)
- [Çevre Değişkenleri](#çevre-değişkenleri)
- [Veritabanı ve Seed](#veritabanı-ve-seed)
- [API](#api)
- [Lisans](#lisans)

---

## Özellikler

- Ürünleri popülarite ve fiyat aralığına göre filtreleme
- Gerçek zamanlı altın fiyatı ile ürün fiyatı hesaplama
- Renk seçimi ve yıldızlı puan gösterimi
- Responsive ve modern arayüz

---

## Kurulum

### Backend Kurulumu

1. **Dizine Girin:**
   ```sh
   cd backend
   ```

2. **Bağımlılıkları Yükleyin:**
   ```sh
   npm install
   ```

3. **Çevre Değişkenlerini Ayarlayın:**
   `.env` dosyasını oluşturun ve aşağıdaki gibi doldurun:
   ```
   GOLD_API_KEY=your_goldapi_key
   ```

4. **Veritabanı Migration ve Seed:**
   - Migration dosyaları ve `schema.prisma` zaten repoda mevcut.
   - Aşağıdaki komutları sırasıyla çalıştırın:
     ```sh
     npx prisma migrate deploy
     node scripts/seedProducts.js
     ```
   - Bu işlemler veritabanı tablolarını oluşturur ve örnek ürünleri ekler.

5. **Sunucuyu Başlatın:**
   ```sh
   npm start
   ```
   Sunucu varsayılan olarak `http://localhost:3001` adresinde çalışır.

---

### Frontend Kurulumu

1. **Dizine Girin:**
   ```sh
   cd frontend
   ```

2. **Bağımlılıkları Yükleyin:**
   ```sh
   npm install
   ```

3. **Geliştirme Sunucusunu Başlatın:**
   ```sh
   npm start
   ```
   Uygulama varsayılan olarak `http://localhost:3000` adresinde açılır.

> **Not:**  
> Geliştirme ortamında, frontend'in `package.json` dosyasındaki `proxy` ayarı sayesinde API istekleri otomatik olarak backend'e yönlendirilir.

---

## Geliştirme Ortamı

- **Backend:**  
  - Node.js (Express)
  - Prisma ORM (SQLite)
  - CORS desteği (farklı domainlerden erişim için)
- **Frontend:**  
  - React
  - Modern CSS ve component yapısı

---

## Çevre Değişkenleri

Backend için `.env` dosyasında:
```
GOLD_API_KEY=your_goldapi_key
```
Bu anahtar, https://www.goldapi.io adresinden ücretsiz veya ücretli planla alınabilecek bir API anahtarıdır. Uygulamanın altın fiyatı verilerini çekebilmesi için bu API key gereklidir.

---

## Veritabanı ve Seed

- **Migration:**  
  Migration dosyaları (`prisma/migrations/`) ve `schema.prisma` repoda bulunur.
- **Seed:**  
  `scripts/seedProducts.js` scripti, `src/data/products.json` dosyasındaki ürünleri veritabanına ekler.

---

## API

### GET `/api/products`

#### Query Parametreleri:
- `popMin` (varsayılan: 0)
- `popMax` (varsayılan: 1)
- `priceMin` (varsayılan: 0)
- `priceMax` (varsayılan: 1000)

#### Örnek:
```
GET /api/products?popMin=0.5&popMax=1&priceMin=100&priceMax=500
```

#### Yanıt:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Engagement Ring 1",
      "popularityScore": 0.85,
      "weight": 2.1,
      "images": { ... },
      "price": 320.50
    },
    ...
  ],
  "error": null
}
```

---

## Lisans

MIT
