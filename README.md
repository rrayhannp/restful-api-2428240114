# RESTful API Manajemen Acara

RESTful API sederhana untuk mengelola data event menggunakan Node.js dan Express.js.

## Identitas

- Nama: Rayhan Primal
- NPM: 2428240114
- Topik: 10 - Manajemen Acara
- Resource: events

## Teknologi

- Node.js
- Express.js

## Instalasi

Install dependency:

```bash
npm install

Menjalankan Server

Jalankan:

npm start

Server berjalan pada:

http://localhost:3000

Untuk mode development:

npm run dev
Endpoint
GET Semua Event
GET /events
GET Event Berdasarkan ID
GET /events/:id

Contoh:

GET /events/1
Filter Berdasarkan Kota
GET /events?kota=Yogyakarta
Menambahkan Event
POST /events

Body JSON:

{
  "namaEvent": "Seminar Nasional Teknologi Web",
  "tanggal": "2026-11-14",
  "kota": "Yogyakarta",
  "kuota": 300,
  "hargaTiket": 50000
}
Mengubah Event
PUT /events/:id
Menghapus Event
DELETE /events/:id


| Field      | Tipe   | Keterangan            |
| ---------- | ------ | --------------------- |
| id         | number | ID otomatis           |
| namaEvent  | string | Nama event            |
| tanggal    | string | Format YYYY-MM-DD     |
| kota       | string | Kota penyelenggaraan  |
| kuota      | number | Kuota peserta         |
| hargaTiket | number | Harga tiket, opsional |
