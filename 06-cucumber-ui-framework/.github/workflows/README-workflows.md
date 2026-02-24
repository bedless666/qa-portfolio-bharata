GitHub Actions untuk Pengujian Otomatis
📌 Deskripsi

Workflow ini mengotomatiskan pengujian UI Web menggunakan Cucumber, Java, Gradle, dan Selenium. Setiap push atau pull request ke main akan memicu pengujian otomatis.

🛠️ Cara Menggunakan

    Pastikan repository telah dikonfigurasi dengan framework pengujian yang sesuai.
    Tambahkan workflow di .github/workflows/main.yml.
    Commit dan push perubahan:

    git add .github/workflows/main.yml  
    git commit -m "Add GitHub Actions workflow"  
    git push origin main  

    Workflow akan otomatis berjalan di tab Actions pada GitHub.

📊 Hasil Pengujian

    Status eksekusi dapat dilihat di GitHub Actions.
    Hasil pengujian disimpan sebagai artefak yang bisa diunduh.
