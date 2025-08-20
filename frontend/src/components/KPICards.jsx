// frontend/src/components/KPICards.jsx
import React, { useEffect, useState } from "react";

const API_BASE = "http://localhost:3000";

export default function KPICards() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/analysis`)
      .then((res) => res.json())
      .then((data) => {
        setSummary(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching KPI:", err);
        setLoading(false);
      });
  }, []);

  // Skeleton loading
  if (loading) {
    return (
      <section className="relative z-10 py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8 text-blue-600">
            📌 KPI Dashboard
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-200 animate-pulse rounded-xl h-32"
                ></div>
              ))}
          </div>
        </div>
      </section>
    );
  }

  if (!summary) {
    return (
      <section className="relative z-10 py-12 bg-slate-50">
        <p className="text-center text-red-500">
          ⚠️ Gagal memuat data KPI
        </p>
      </section>
    );
  }

  return (
    <section className="relative z-10 py-12 bg-slate-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8 text-blue-600">
          📌 KPI Dashboard
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Total Records */}
          <KpiCard
            title="Total Catatan Absensi"
            value={summary.totalRecords}
            color="blue"
          />

          {/* Rata-rata Lembur */}
          <KpiCard
            title="Avg Lembur"
            value={`${summary.lembur?.mean || 0} menit`}
            color="green"
          />

          {/* Rata-rata Pulang Cepat */}
          <KpiCard
            title="Avg Pulang Cepat"
            value={`${summary.pulangCepat?.mean || 0} menit`}
            color="yellow"
          />

          {/* Rata-rata Telat */}
          <KpiCard
            title="Avg Keterlambatan"
            value={`${summary.telat?.mean || 0} menit`}
            color="red"
          />
        </div>
      </div>
    </section>
  );
}

// 🔹 Sub-komponen untuk kartu KPI biar lebih clean
function KpiCard({ title, value, color }) {
  const colorMap = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-50 text-green-700",
    yellow: "bg-yellow-50 text-yellow-700",
    red: "bg-red-50 text-red-700",
  };

  const textColor = {
    blue: "text-blue-900",
    green: "text-green-900",
    yellow: "text-yellow-900",
    red: "text-red-900",
  };

  return (
    <div
      className={`${colorMap[color]} shadow-md rounded-xl p-6 text-center hover:shadow-lg transition`}
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className={`text-3xl font-bold ${textColor[color]}`}>{value}</p>
    </div>
  );
}