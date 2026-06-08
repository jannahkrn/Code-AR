# Code-AR 📱

Media edukasi interaktif berbasis WebAR (*Web-based Augmented Reality*) untuk belajar dasar-dasar pengembangan web menggunakan satu *flashcard*. Scan *flashcard* ➔ pelajari HTML, CSS, dan JavaScript dalam 12 *scene* AR berurutan langsung dari browser *smartphone* kamu.

---

## 📝 Deskripsi

**Code-AR** adalah aplikasi WebAR yang dikembangkan sebagai Tugas Besar mata kuliah **Teknologi Imersif**. Aplikasi ini mengenalkan sintaks dan konsep dasar pengembangan web (HTML, CSS, JavaScript) melalui visualisasi objek 3D interaktif yang muncul di atas sebuah *flashcard* menggunakan kamera *smartphone*.

Pengguna tidak perlu menginstal aplikasi apapun. Cukup buka URL di browser, arahkan kamera ke *flashcard*, dan materi akan tampil secara otomatis dan berurutan. Di akhir setiap topik, pengguna akan diuji melalui *mini game* pilihan ganda interaktif.

---

## ✨ Fitur Utama

* **Single Marker:** Cukup satu *flashcard* untuk menampilkan semua materi.
* **12 Scene AR Berurutan:** Terbagi menjadi 3 scene HTML ➔ Mini Game HTML ➔ 3 scene CSS ➔ Mini Game CSS ➔ 3 scene JavaScript ➔ Mini Game JS.
* **Mini Game Per Topik:** Kuis pilihan ganda interaktif di akhir setiap topik (HTML, CSS, JavaScript) untuk menguji pemahaman.
* **Sound Interaktif:** Efek suara pada setiap interaksi pengguna (navigasi, jawaban benar/salah, deteksi marker).
* **Objek 3D Animasi:** Objek 3D berputar di scene pembuka setiap topik untuk memperkuat visualisasi AR.
* **Navigasi Interaktif:** Berpindah antar *scene* dengan mudah menggunakan tombol *Lanjut* dan *Sebelumnya*.
* **Progress Bar:** Indikator visual untuk menunjukkan posisi *scene* yang sedang aktif.
* **Tanpa Instalasi:** Cukup diakses melalui browser modern *smartphone* (Android & iOS).

---

## 📚 Materi yang Dipelajari

### 🌐 HTML (Scene 1-3 + Mini Game) — *Jannah*
* **Scene 1:** Struktur Dokumen HTML
* **Scene 2:** Elemen dan Tag HTML
* **Scene 3:** Atribut HTML
* **Scene 10:** 🎮 Mini Game HTML — Kuis pilihan ganda materi HTML

### 🎨 CSS (Scene 4-6 + Mini Game) — *Luthfi*
* **Scene 4:** Selektor dan Properti CSS
* **Scene 5:** Box Model
* **Scene 6:** Flexbox Layout
* **Scene 11:** 🎮 Mini Game CSS — Kuis pilihan ganda materi CSS

### ⚡ JavaScript (Scene 7-9 + Mini Game) — *Indra*
* **Scene 7:** Variabel dan Tipe Data
* **Scene 8:** Fungsi (*Function*)
* **Scene 9:** Manipulasi DOM
* **Scene 12:** 🎮 Mini Game JS — Kuis pilihan ganda materi JavaScript

---

## 🛠️ Teknologi yang Digunakan

* **MindAR.js v1.2.5** — *Image tracking* untuk mendeteksi *marker flashcard*.
* **A-Frame v1.4.2** — *Render* objek 3D di browser.
* **HTML5, CSS3, & JavaScript (ES6)** — Bahasa dasar pembangunan aplikasi web.
* **Web Audio API** — Memutar efek suara interaktif saat pengguna berinteraksi.

---

## 📁 Struktur Folder
code-ar/
├── index.html          # Halaman utama dan integrasi semua scene
├── style.css           # Styling UI overlay (tombol, progress bar, header)
├── script.js           # Logika MindAR, navigasi scene, mini game, dan sound
├── markers/
│   └── targets.mind    # File marker dari flashcard
├── scenes/
│   ├── scene-html.html # Konten scene 1, 2, 3 (HTML) + scene 10 (Mini Game HTML)
│   ├── scene-css.html  # Konten scene 4, 5, 6 (CSS) + scene 11 (Mini Game CSS)
│   └── scene-js.html   # Konten scene 7, 8, 9 (JavaScript) + scene 12 (Mini Game JS)
├── sounds/
│   ├── button1.mp3     # Suara navigasi Lanjut
│   ├── button2.mp3     # Suara navigasi Sebelumnya
│   ├── button3.mp3     # Suara jawaban benar / tap elemen interaktif
│   ├── button4.mp3     # Suara jawaban salah
│   └── button5.mp3     # Suara marker terdeteksi
└── assets/
└── flashcard.png   # Desain flashcard yang digunakan sebagai marker

---

## Cara Menjalankan

1. Clone atau download repository ini
   git clone https://github.com/jannahkrn/Code-AR.git

2. Masuk ke folder proyek
   cd code-ar

3. Jalankan menggunakan live server (wajib HTTPS atau localhost)
   Gunakan ekstensi Live Server di VS Code, atau jalankan perintah berikut jika sudah menginstal Node.js:
   npx serve .

4. Buka URL yang muncul di browser smartphone kamu

5. Izinkan akses kamera saat diminta browser

6. Arahkan kamera ke flashcard Code-AR

7. Materi AR akan muncul secara otomatis, mulai dari scene 1 (HTML)

8. Tekan tombol Lanjut untuk berpindah ke scene berikutnya

9. Di akhir setiap topik (setelah scene 3, 6, dan 9), mini game akan muncul otomatis

10. Tap kotak jawaban pada mini game untuk menjawab soal pilihan ganda

---

## Alur Navigasi Scene

Scan Flashcard → Scene 1-3 (HTML) → 🎮 Mini Game HTML → Scene 4-6 (CSS) → 🎮 Mini Game CSS → Scene 7-9 (JS) → 🎮 Mini Game JS → Selesai

---

## Catatan Penting

- Aplikasi wajib dijalankan melalui HTTPS atau localhost karena MindAR membutuhkan akses kamera yang hanya diizinkan browser pada koneksi aman
- Gunakan browser Chrome (Android) atau Safari (iOS) untuk hasil terbaik
- Pastikan pencahayaan cukup saat mengarahkan kamera ke flashcard agar marker mudah terdeteksi
- Pegang flashcard di permukaan datar dan jaga jarak kamera sekitar 20-40 cm dari flashcard
- File sound (.mp3) harus diletakkan di dalam folder sounds/ agar efek suara berfungsi

---

## Cara Generate File Marker (.mind)

1. Buka https://hiukim.github.io/mind-ar-js-doc/tools/compile
2. Upload file flashcard.png dari folder assets
3. Klik Start
4. Download file targets.mind yang dihasilkan
5. Simpan file tersebut ke dalam folder markers/

---

## Tim Pengembang

| Nama   | Topik      | Tanggung Jawab                                                                         |
|--------|------------|----------------------------------------------------------------------------------------|
| Jannah | HTML       | Desain flashcard, struktur proyek, scene 1-3, mini game HTML (scene 10), integrasi     |
| Luthfi | CSS        | Scene 4-6 (materi CSS), mini game CSS (scene 11), sound interaktif                    |
| Indra  | JavaScript | Scene 7-9 (materi JavaScript), mini game JS (scene 12), objek 3D animasi              |

---

## Lisensi

Proyek ini dibuat untuk keperluan akademik — Tugas Besar Mata Kuliah Teknologi Imersif 2026.