// Import Express
const express = require("express");

const app = express();

// Middleware untuk membaca JSON
app.use(express.json());

// Data awal event
let events = [
  {
    id: 1,
    namaEvent: "Seminar Nasional Teknologi Web",
    tanggal: "2026-11-14",
    kota: "Yogyakarta",
    kuota: 300,
    hargaTiket: 50000
  },
  {
    id: 2,
    namaEvent: "Festival Musik Palembang",
    tanggal: "2026-12-05",
    kota: "Palembang",
    kuota: 500,
    hargaTiket: 75000
  },
  {
    id: 3,
    namaEvent: "Workshop UI/UX Design",
    tanggal: "2027-01-10",
    kota: "Jakarta",
    kuota: 100,
    hargaTiket: 100000
  }
];

// ID berikutnya
let nextId = 4;


// GET /
// Informasi API
app.get("/", (req, res) => {
  res.status(200).json({
    nama: "Rayhan Primal",
    npm: "2428240114",
    topik: 10,
    resource: "events",
    endpoints: [
      "GET /events",
      "GET /events/:id",
      "GET /events?kota=Yogyakarta",
      "POST /events",
      "PUT /events/:id",
      "DELETE /events/:id"
    ]
  });
});


// GET /events
// Mengambil semua event
app.get("/events", (req, res) => {
  const { kota } = req.query;

  if (kota) {
    const hasil = events.filter(
      (event) => event.kota.toLowerCase() === kota.toLowerCase()
    );

    return res.status(200).json(hasil);
  }

  res.status(200).json(events);
});


// GET /events/:id
// Mengambil satu event berdasarkan ID
app.get("/events/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const event = events.find((event) => event.id === id);

  if (!event) {
    return res.status(404).json({
      status: "error",
      message: `Data dengan id ${id} tidak ditemukan`,
      data: null
    });
  }

  res.status(200).json(event);
});


// POST /events
// Body:
// {
//   "namaEvent": "Seminar Nasional Teknologi Web",
//   "tanggal": "2026-11-14",
//   "kota": "Yogyakarta",
//   "kuota": 300,
//   "hargaTiket": 50000
// }
app.post("/events", (req, res) => {
  const {
    namaEvent,
    tanggal,
    kota,
    kuota,
    hargaTiket
  } = req.body;

  // Validasi field wajib
  if (
    !namaEvent || 
    !tanggal || 
    !kota || 
    kuota === undefined ||
    typeof kuota !== "number"
) {
    return res.status(400).json({
      status: "error",
      message: "namaEvent, tanggal, kota, dan kuota wajib diisi",
      data: null
    });
  }

  const eventBaru = {
    id: nextId++,
    namaEvent,
    tanggal,
    kota,
    kuota,
    hargaTiket
  };

  events.push(eventBaru);

  res.status(201).json({
    status: "success",
    message: "Data event berhasil ditambahkan",
    data: eventBaru
  });
});


// PUT /events/:id
// Mengubah seluruh data event
app.put("/events/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = events.findIndex(
    (event) => event.id === id
  );

  // Validasi ID
  if (index === -1) {
    return res.status(404).json({
      status: "error",
      message: `Data dengan id ${id} tidak ditemukan`,
      data: null
    });
  }

  const {
    namaEvent,
    tanggal,
    kota,
    kuota,
    hargaTiket
  } = req.body;

  // Validasi field wajib
  if (!namaEvent || !tanggal || !kota || kuota === undefined) {
    return res.status(400).json({
      status: "error",
      message: "namaEvent, tanggal, kota, dan kuota wajib diisi",
      data: null
    });
  }

  const eventUpdate = {
    id,
    namaEvent,
    tanggal,
    kota,
    kuota,
    hargaTiket
  };

  events[index] = eventUpdate;

  res.status(200).json({
    status: "success",
    message: "Data event berhasil diubah",
    data: eventUpdate
  });
});


// DELETE /events/:id
// Menghapus event berdasarkan ID
app.delete("/events/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = events.findIndex(
    (event) => event.id === id
  );

  if (index === -1) {
    return res.status(404).json({
      status: "error",
      message: `Data dengan id ${id} tidak ditemukan`,
      data: null
    });
  }

  events.splice(index, 1);

  res.status(200).json({
    status: "success",
    message: `Data event dengan id ${id} berhasil dihapus`,
    data: null
  });
});


// Catch-all 404
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Endpoint tidak ditemukan",
    data: null
  });
});


// Port server
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
}

module.exports = app;