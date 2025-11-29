### REST API
<p>
    REST API atau singkatan dari Representational State Transfer Application Programming Interface adalah sebuah metode yang memungkinkan komunikasi antar aplikasi web, mobile, desktop melalui protokol HTTP. <br>
    Dengan adanya metode ini
    komunikasi antar aplkasi menjadi lebih mudah karena tersedia beberapa HTTP Method POST, GET, UPDATE, PATCH, DAN DELETE.
</p>

### CORS
<p>CORS atau singkatan dari Cross-Origin Resource Sharing adalah sebuah mekanisme keamanan agar API atau resource hanya bisa diakses oleh sumber daya asal atau hanya bisa diakses oleh server yang diizinkan. </p>

### SQL dan NoSQL
<p>SQL atau Structured Query Language adalah database yang memiliki relasional dan berbasis query. Contohnya PostgreSQL, MySQL, MssSQL.</p>
<p>NoSQL atau Not Only SQL adalah database yang tidak memiliki relasional dan berbasis object atau memiliki key dan value. Database ini bersifat semi structued. Contohnya ada MongoDB.</P>

### SQL dan NoSQL
<p>Middleware adalah lapisan atau layer dalam suatu aplikasi yang berfungsi untuk menghuungkan komponen lain dengan komponen lainnya. Contoh penerapan middleware adalah untuk membuat authentikasi, authorization, dan permission dalam suatu aplikasi</p>

### Crud Aplikasi Todo

<p> Tech Stack </p>

| Tech           | Name           | Version       |
|:---------------|:--------------:|--------------:|
| Language       | Typescript     | 5.1.3         |
| Framework      | NestJS         | 10.0.0        |
| Database       | PostgreSQL     | 16.2          |
| ORM            | Prisma         | 6.19.0        |


<p>Langkah-langkah dalam menggunakan aplikasi </p>

<ol>
  <li> 
    Install semua kebutuhan aplikasi : $npm install
  </li>
  <li>Atur environment yang ada di file .env</li>
  <li>Migrate database : $npx migrata dev</li>
  <li>Jalankan Aplikasi : $npm run start:dev</li>
  <li>Buka dokumentasi : http://localhost:3000/docs-api</li>
</ol> 