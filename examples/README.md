# CortexAI SDK Examples

Bu klasör CortexAI SDK'sının nasıl kullanılacağını gösteren örnek uygulamaları içerir.

## Başlangıç

1. `.env.local.example` dosyasını `.env.local` olarak kopyalayın
2. `.env.local` dosyasındaki API anahtarını kendi anahtarınızla değiştirin
3. Bağımlılıkları yükleyin:
   ```bash
   npm install
   # veya
   pnpm install
4. Geliştirme sunucusunu başlatın:   
   npm run dev
   # veya
   pnpm dev

API Endpoint'leri
GET /api/models - Mevcut modelleri listeler
POST /api/chat - Chat completion isteği gönderir
POST /api/stream - Streaming chat completion isteği gönderir
Örnekler
Her bir örnek, SDK'nın farklı özelliklerini gösterir:

models-example.ts: Model listesi alma
chat-example.ts: Normal chat completion
stream-example.ts: Streaming chat completion


Bu örnekler:
1. SDK'nın temel kullanımını gösterir
2. API endpoint'lerini örneklendirir
3. Hata yönetimini içerir
4. Streaming desteğini gösterir
5. Çalışan bir uygulama oluşturur
