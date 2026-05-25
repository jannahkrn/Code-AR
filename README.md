# Code-AR 📱

Media edukasi interaktif berbasis WebAR (Web-based Augmented Reality) untuk belajar dasar-dasar pengembangan web menggunakan satu flashcard. Scan flashcard → pelajari HTML, CSS, dan JavaScript dalam 9 scene AR berurutan langsung dari browser smartphone kamu.

---

## Deskripsi

Code-AR adalah aplikasi WebAR yang dikembangkan sebagai Tugas Besar mata kuliah Teknologi Sistem Informasi. Aplikasi ini mengenalkan sintaks dan konsep dasar pengembangan web (HTML, CSS, JavaScript) melalui visualisasi objek 3D interaktif yang muncul di atas sebuah flashcard menggunakan kamera smartphone.

Pengguna tidak perlu menginstal aplikasi apapun. Cukup buka URL di browser, arahkan kamera ke flashcard, dan materi akan tampil secara otomatis dan berurutan.

---

## Fitur

- Satu flashcard untuk semua materi
- 9 scene AR berurutan: 3 scene HTML → 3 scene CSS → 3 scene JavaScript
- Navigasi antar scene dengan tombol Lanjut dan Sebelumnya
- Progress bar yang menunjukkan posisi scene saat ini
- Visualisasi objek 3D interaktif di setiap scene
- Tidak perlu install aplikasi, cukup browser modern
- Mendukung smartphone Android dan iOS

---

## Materi yang Dipelajari

HTML (Scene 1-3) — Jannah
- Scene 1: Struktur Dokumen HTML
- Scene 2: Elemen dan Tag HTML
- Scene 3: Atribut HTML

CSS (Scene 4-6) — Luthfi
- Scene 4: Selektor dan Properti CSS
- Scene 5: Box Model
- Scene 6: Flexbox Layout

JavaScript (Scene 7-9) — Indra
- Scene 7: Variabel dan Tipe Data
- Scene 8: Fungsi (Function)
- Scene 9: Manipulasi DOM

---

## Teknologi yang Digunakan

- MindAR.js v1.2.5 — image tracking untuk mendeteksi marker flashcard
- A-Frame v1.4.2 — render objek 3D di browser
- HTML, CSS, JavaScript — bahasa dasar pembangunan aplikasi

---

## Struktur Folder

code-ar/
├── index.html          → halaman utama dan integrasi semua scene
├── style.css           → styling UI overlay (tombol, progress bar, header)
├── script.js           → logika MindAR, navigasi scene, interaksi
├── markers/
│   └── target.mind     → file marker dari flashcard
├── scenes/
│   ├── scene-html.html → konten scene 1, 2, 3 (HTML)
│   ├── scene-css.html  → konten scene 4, 5, 6 (CSS)
│   └── scene-js.html   → konten scene 7, 8, 9 (JavaScript)
└── assets/
└── flashcard.png   → desain flashcard yang digunakan sebagai marker

---

## Cara Menjalankan

1. Clone atau download repository ini
   git clone https://github.com/username/code-ar.git

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

---

## Catatan Penting

- Aplikasi wajib dijalankan melalui HTTPS atau localhost karena MindAR membutuhkan akses kamera yang hanya diizinkan browser pada koneksi aman
- Gunakan browser Chrome (Android) atau Safari (iOS) untuk hasil terbaik
- Pastikan pencahayaan cukup saat mengarahkan kamera ke flashcard agar marker mudah terdeteksi
- Pegang flashcard di permukaan datar dan jaga jarak kamera sekitar 20-40 cm dari flashcard

---

## Cara Generate File Marker (.mind)

1. Buka https://hiukim.github.io/mind-ar-js-doc/tools/compile
2. Upload file flashcard.png dari folder assets
3. Klik Start
4. Download file target.mind yang dihasilkan
5. Simpan file tersebut ke dalam folder markers/

---

## Tim Pengembang

| Nama   | Topik      | Tanggung Jawab                                              |
|--------|------------|-------------------------------------------------------------|
| Jannah | HTML       | Desain flashcard, struktur proyek, scene 1-3, integrasi     |
| Luthfi | CSS        | Scene 4, 5, 6 (materi CSS)                                  |
| Indra  | JavaScript | Scene 7, 8, 9 (materi JavaScript)                           |

---

## Lisensi

Proyek ini dibuat untuk keperluan akademik — Tugas Besar Mata Kuliah Teknologi Imersif 2026.