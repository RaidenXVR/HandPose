# Implementasi Hand Pose

Projek ini dibuat untuk memenuhi mata kuliah Interaksi Manusia-Komputer

## Description

Projek ini menunjukkan penggunaan Hand Pose (Pose Jari) sebagai alternatif penggunaan perangkat layar sentuh dengan kamera sebagai pendeteksi pose jari. Pose jari dapat dimodifikasi di `poses.json` dengan mendeskripsikan ditekuk atau tidaknya jari dan arah jari menunjuk. Output dari hasil deteksi akan dikirim menuju Server FastAPI dan disesuaikan dengan pose yang sudah dideskripsikan, kemudian server React akan mengambil hasil tersebut dan diolah di website React tersebut sehingga dapat memilih tombol yang diinginkan.

## Getting Started

Sebelum memulai, pastikan NPM dan Python 3.11 terinstall, kemudian install dependencies dengan menjalankan `install.ps1`. Untuk memulai, gunakan `start.ps1`.

### Dependencies

* Python 3.11 (Tested on 3.11.4)
* Windows 10/11
* PowerShell 6+
* npm 10+

### Installing

* Install NPM (Jika Belum)
* Install Python 3.11 (Jika Belum)
* Clone repository ini.
* Jalankan install.ps1 menggunakan PowerShell (`powershell -ExecutionPolicy ByPass -File ./install.ps1`)

### Executing program

* Buka Terminal PowerShell
* Buka direktori tempat repository di clone (Menggunakan cd)
* Ketik `./start.ps1` dan tekan enter.
* Jika terjadi error ExecutionPolicy, jalankan dengan `powershell -ExecutionPolicy ByPass -File ./start.ps1`
* Untuk menghentikan Program, buka webcam yang muncul dan tekan `q`, maka program akan berhenti.

## Help


## Authors

* [@RaidenXVR/Fitran Alfian Nizar](https://github.com/RaidenXVR)

## Version History

* 0.1
    * Initial Release

## License

## Acknowledgments

Inspiration, code snippets, etc.
* [awesome-readme](https://github.com/matiassingers/awesome-readme)
* [PurpleBooth](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)
* [dbader](https://github.com/dbader/readme-template)
* [zenorocha](https://gist.github.com/zenorocha/4526327)
* [fvcproductions](https://gist.github.com/fvcproductions/1bfc2d4aecb01a834b46)