# Code-AR 📱

Media edukasi interaktif berbasis WebAR (*Web-based Augmented Reality*) untuk belajar dasar-dasar pengembangan web menggunakan satu *flashcard*. Scan *flashcard* ➔ pelajari HTML, CSS, dan JavaScript dalam 15 *scene* AR berurutan langsung dari browser *smartphone* kamu.

---

## 📝 Deskripsi

**Code-AR** adalah aplikasi WebAR yang dikembangkan sebagai Tugas Besar mata kuliah **Teknologi Imersif**. Aplikasi ini mengenalkan sintaks dan konsep dasar pengembangan web (HTML, CSS, JavaScript) melalui visualisasi objek 3D yang muncul di atas sebuah *flashcard* menggunakan kamera *smartphone*.

Pengguna tidak perlu menginstal aplikasi apapun. Cukup buka URL di browser, arahkan kamera ke *flashcard*, dan materi akan tampil secara otomatis dan berurutan. Sebelum setiap mini game, pengguna disambut oleh scene **Robot Playground** berbasis model 3D sebagai transisi visual. Di akhir setiap topik, pengguna diuji melalui *mini game* pilihan ganda — jika salah lebih dari 3 kali, pengguna harus mengulang game sebelum bisa melanjutkan ke topik berikutnya.

---

## ✨ Fitur Utama

* **Single Marker:** Cukup satu *flashcard* untuk menampilkan semua 15 scene.
* **15 Scene AR Berurutan:** 3 HTML → 🤖 Robot → 🎮 Game HTML → 3 CSS → 🤖 Robot → 🎮 Game CSS → 3 JS → 🤖 Robot → 🎮 Game JS.
* **Scene Robot Playground:** Model 3D robot berputar muncul sebagai transisi sebelum setiap mini game, memberi motivasi visual kepada pengguna.
* **Mini Game Per Topik:** Kuis pilihan ganda di akhir setiap topik. Jika menjawab salah lebih dari 3 kali, game mengulang dari awal dan pengguna tidak bisa lanjut sebelum berhasil.
* **Skor Mini Game:** Di akhir setiap game ditampilkan skor akhir (benar / total) dan jumlah jawaban salah.
* **Sound Interaktif:** Efek suara pada navigasi, jawaban benar/salah, dan deteksi marker.
* **Objek 3D Animasi:** Objek 3D berputar di scene pembuka setiap topik untuk memperkuat visualisasi AR.
* **Navigasi Interaktif:** Berpindah antar scene dengan tombol *Lanjut* dan *Sebelumnya*.
* **Progress Bar:** Indikator visual posisi scene yang sedang aktif dari 15 scene total.
* **Tanpa Instalasi:** Diakses melalui browser modern (Android & iOS).

---

## 📚 Materi yang Dipelajari

### 🌐 HTML (Scene 1-3 + Robot + Mini Game) 
* **Scene 1:** Struktur Dokumen HTML
* **Scene 2:** Elemen dan Tag HTML
* **Scene 3:** Atribut HTML
* **Scene 13:** 🤖 Robot Playground — transisi sebelum game HTML
* **Scene 10:** 🎮 Mini Game HTML — kuis pilihan ganda materi HTML

### 🎨 CSS (Scene 4-6 + Robot + Mini Game)
* **Scene 4:** Selektor dan Properti CSS
* **Scene 5:** Box Model
* **Scene 6:** Flexbox Layout
* **Scene 14:** 🤖 Robot Playground — transisi sebelum game CSS
* **Scene 11:** 🎮 Mini Game CSS — kuis pilihan ganda materi CSS

### ⚡ JavaScript (Scene 7-9 + Robot + Mini Game) 
* **Scene 7:** Variabel dan Tipe Data
* **Scene 8:** Fungsi (*Function*)
* **Scene 9:** Manipulasi DOM
* **Scene 15:** 🤖 Robot Playground — transisi sebelum game JS
* **Scene 12:** 🎮 Mini Game JS — kuis pilihan ganda materi JavaScript

---

## 🛠️ Teknologi yang Digunakan

* **MindAR.js v1.2.5** — *Image tracking* untuk mendeteksi marker *flashcard*.
* **A-Frame v1.4.2** — *Render* objek 3D di browser menggunakan WebXR dan WebGL.
* **HTML5, CSS3, & JavaScript (ES6)** — Bahasa dasar pembangunan aplikasi web.
* **Web Audio API** — Memutar efek suara interaktif saat pengguna berinteraksi.
* **glTF/GLB (robot_playground.glb)** — Model 3D robot dari Sketchfab yang digunakan sebagai scene transisi.

---

## 📁 Struktur Folder

code-ar/
├── index.html           # Halaman utama dan integrasi semua scene
├── style.css            # Styling UI overlay (tombol, progress bar, header, game overlay)
├── script.js            # Logika MindAR, navigasi scene, mini game, robot scene, dan sound
├── markers/
│   └── targets.mind     # File marker dari flashcard
├── scenes/
│   ├── scene-html.html  # Scene 1, 2, 3 (HTML) + scene 10 placeholder (Mini Game HTML)
│   ├── scene-css.html   # Scene 4, 5, 6 (CSS) + scene 11 placeholder (Mini Game CSS)
│   └── scene-js.html    # Scene 7, 8, 9 (JavaScript) + scene 12 placeholder (Mini Game JS)
├── sounds/
│   ├── button1.mp3      # Suara navigasi Lanjut
│   ├── button2.mp3      # Suara navigasi Sebelumnya
│   ├── button3.mp3      # Suara jawaban benar
│   ├── button4.mp3      # Suara jawaban salah
│   └── button5.mp3      # Suara marker terdeteksi
└── assets/
    ├── flashcard.png        # Desain flashcard yang digunakan sebagai marker
    └── robot_playground.glb # Model 3D Robot Playground (Sketchfab — Hadrien59)

---

## ▶️ Cara Menjalankan

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

9. Setelah scene 3, 6, dan 9 akan muncul scene Robot Playground sebagai transisi

10. Tekan Lanjut lagi untuk masuk ke mini game

11. Pilih jawaban pada mini game — jika salah lebih dari 3 kali, game mengulang dari awal

12. Setelah lulus mini game, tekan Lanjut untuk melanjutkan ke topik berikutnya

---

## 🗺️ Alur Navigasi Scene

Scan Flashcard
    → Scene 1-3 (HTML)
    → 🤖 Scene 13 (Robot Playground)
    → 🎮 Scene 10 (Mini Game HTML)
    → Scene 4-6 (CSS)
    → 🤖 Scene 14 (Robot Playground)
    → 🎮 Scene 11 (Mini Game CSS)
    → Scene 7-9 (JavaScript)
    → 🤖 Scene 15 (Robot Playground)
    → 🎮 Scene 12 (Mini Game JS)
    → 🏆 Selesai!

---

## 🎮 Aturan Mini Game

* Setiap mini game terdiri dari 4 soal pilihan ganda.
* Tombol jawaban langsung berubah warna: hijau jika benar, merah jika salah (jawaban benar juga ditampilkan).
* Jika menjawab salah lebih dari 3 kali dalam satu game, game mengulang dari awal.
* Pengguna tidak bisa melanjutkan ke topik berikutnya sebelum menyelesaikan mini game dengan salah maksimal 3.
* Di akhir game, ditampilkan skor akhir (jumlah benar / total soal) dan jumlah salah.

---

## ⚠️ Catatan Penting

* Aplikasi wajib dijalankan melalui HTTPS atau localhost karena MindAR membutuhkan akses kamera yang hanya diizinkan browser pada koneksi aman.
* Gunakan browser Chrome (Android) atau Safari (iOS) untuk hasil terbaik.
* Pastikan pencahayaan cukup saat mengarahkan kamera ke flashcard agar marker mudah terdeteksi.
* Pegang flashcard di permukaan datar dan jaga jarak kamera sekitar 20-40 cm dari flashcard.
* File robot_playground.glb harus berada di dalam folder assets/ agar scene robot dapat tampil.
* File sound (.mp3) harus berada di dalam folder sounds/ agar efek suara berfungsi.

---

## 🔧 Cara Generate File Marker (.mind)

1. Buka https://hiukim.github.io/mind-ar-js-doc/tools/compile
2. Upload file flashcard.png dari folder assets/
3. Klik Start
4. Download file targets.mind yang dihasilkan
5. Simpan ke dalam folder markers/

---

## 👥 Tim Pengembang

Nama    | Topik      | Tanggung Jawab
--------|------------|---------------------------------------------------------------
Jannah  | HTML       | Desain flashcard, struktur proyek, scene 1-3, scene robot 13-15, pencarian asset 3D robot, mini game HTML (scene 10), mini game CSS (scene 11), mini game JS (scene 12), integrasi, sound interaktif, objek 3D animasi
Luthfi  | CSS        | Scene 4-6 (materi CSS)
Indra   | JavaScript | Scene 7-9 (materi JavaScript)

---

## 📄 Lisensi

Proyek ini dibuat untuk keperluan akademik — Tugas Besar Mata Kuliah Teknologi Imersif 2026.

Model 3D Robot Playground oleh Hadrien59 digunakan dari Sketchfab untuk keperluan non-komersial.