// backend/server.js
const express = require("express");
const cors = require("cors");
const XLSX = require("xlsx");
const path = require("path");

const app = express();
app.use(cors());

// --- Utility: Normalisasi nama kolom Excel ---
const normalizeKey = (key) =>
  String(key)
    .toLowerCase()
    .replace(/\s+/g, "_")   // spasi -> underscore
    .replace(/\//g, "_")    // "/" -> underscore
    .trim();

// --- Helper: parsing angka aman ---
const num = (v) => {
  if (v === null || v === undefined) return null;
  if (v === "") return null;                 // sel kosong
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

// --- Baca file Excel ---
const filePath = path.resolve(__dirname, "../Soal Tes.xlsx");
const workbook = XLSX.readFile(filePath);
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

// Convert ke JSON (sel kosong biarkan kosong, bukan 0)
const rawData = XLSX.utils.sheet_to_json(sheet, { defval: "" });

// Normalisasi kolom → hasil key konsisten
const data = rawData.map((row) => {
  const newRow = {};
  for (let k in row) newRow[normalizeKey(k)] = row[k];
  return newRow;
});

console.log("🔎 Total rows terbaca:", data.length);
console.log("🔎 Contoh row pertama:", data[0]);

// --- Ringkasan data ---
const summary = {
  cabang: {},
  departemen: {},
  shift: {},
  lembur: { mean: 0, max: 0, min: 0 },
  pulangCepat: { mean: 0, max: 0, min: 0 },
  telat: { mean: 0, max: 0, min: 0 },
  totalRecords: data.length,
  lemburRaw: [],
  pulangCepatRaw: [],
  telatRaw: [],
};

// Array mentah untuk perhitungan
const lemburArr = [];
const pulangCepatArr = [];
const telatArr = [];

data.forEach((row) => {
  // Agregat kategori
  if (row.cabang) {
    summary.cabang[row.cabang] = (summary.cabang[row.cabang] || 0) + 1;
  }
  if (row.departemen || row.departement) {
    const dept = row.departemen || row.departement;
    summary.departemen[dept] = (summary.departemen[dept] || 0) + 1;
  }
  const shift = row.shift?.trim() || "Unknown";
  summary.shift[shift] = (summary.shift[shift] || 0) + 1;

  // Angka-angka (pakai key hasil normalize)
  const vLembur = num(row["lembur_(menit)"]);
  if (vLembur !== null) lemburArr.push(vLembur);

  const vPulangCepat = num(row["pulang_cepat_(menit)"]);
  if (vPulangCepat !== null) pulangCepatArr.push(vPulangCepat);

  const vTelat = num(row["telat_(menit)"]);
  if (vTelat !== null) telatArr.push(vTelat);
});

// Fungsi helper statistik
const calcStats = (arr) => {
  if (!arr.length) return { mean: 0, max: 0, min: 0 };
  const sum = arr.reduce((a, b) => a + b, 0);
  return {
    mean: +((sum / arr.length).toFixed(2)),
    max: Math.max(...arr),
    min: Math.min(...arr),
  };
};

// Hitung statistik & simpan raw
summary.lembur = calcStats(lemburArr);
summary.pulangCepat = calcStats(pulangCepatArr);
summary.telat = calcStats(telatArr);

summary.lemburRaw = lemburArr;
summary.pulangCepatRaw = pulangCepatArr;
summary.telatRaw = telatArr;

// --- Endpoint API ---
app.get("/api/analysis", (req, res) => {
  res.json(summary);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});