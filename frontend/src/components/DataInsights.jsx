// frontend/src/components/DataInsights.jsx
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { motion } from "framer-motion";

const API_BASE = "http://localhost:3000";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  BarElement
);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: "bottom" },
  },
};

// Variasi animasi
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function DataInsights() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/analysis`)
      .then((res) => res.json())
      .then((d) => setData(d))
      .catch((err) => console.error("Error fetch data:", err));
  }, []);

  if (!data)
    return (
      <section className="relative z-10 py-16 bg-slate-50">
        <p className="text-center text-gray-500">Loading charts...</p>
      </section>
    );

  // Pie: Cabang
  const branchData = {
    labels: Object.keys(data.cabang),
    datasets: [
      {
        data: Object.values(data.cabang),
        backgroundColor: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"],
      },
    ],
  };

  // Bar: Departemen
  const deptData = {
    labels: Object.keys(data.departemen),
    datasets: [
      {
        label: "Jumlah",
        data: Object.values(data.departemen),
        backgroundColor: ["#10B981", "#3B82F6", "#F59E0B", "#EF4444"],
      },
    ],
  };

  // Histogram Lembur
  const bins = [0, 30, 60, 120, 180, 240, 300];
  const histo = bins.map((b, i) => {
    if (i === bins.length - 1) return data.lembur.max > b ? 1 : 0;
    return data.lembur.mean >= b && data.lembur.mean < bins[i + 1] ? 1 : 0;
  });
  const overtimeData = {
    labels: bins.map((b, i) =>
      i === bins.length - 1 ? `${b}+` : `${b}-${bins[i + 1]}`
    ),
    datasets: [
      {
        label: "Distribusi (berdasarkan mean)",
        data: histo,
        backgroundColor: "#F59E0B",
      },
    ],
  };

  // Boxplot Pulang Cepat (pakai Bar sementara)
  const boxData = {
    labels: ["Pulang Cepat"],
    datasets: [
      {
        label: "Statistik",
        data: [
          [data.pulangCepat.min, data.pulangCepat.mean, data.pulangCepat.max],
        ],
        backgroundColor: "#EF4444",
      },
    ],
  };

  return (
    <section id="insights" className="relative z-10 py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl font-bold text-center mb-12 text-blue-600"
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          📊 Data Insights
        </motion.h2>

        {/* Chart atas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-center mb-4 text-gray-700">
              Distribusi Cabang
            </h3>
            <div className="h-60">
              {Object.keys(data.cabang).length ? (
                <Pie data={branchData} options={chartOptions} />
              ) : (
                <p className="text-center text-gray-400">Tidak ada data</p>
              )}
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-center mb-4 text-gray-700">
              Distribusi Departemen
            </h3>
            {Object.keys(data.departemen).length ? (
              <Bar data={deptData} />
            ) : (
              <p className="text-center text-gray-400">Tidak ada data</p>
            )}
          </motion.div>
        </div>

        {/* Chart bawah */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-center mb-4 text-gray-700">
              Histogram Lembur
            </h3>
            {data.lembur && data.lembur.max > 0 ? (
              <Bar data={overtimeData} />
            ) : (
              <p className="text-center text-gray-400">Tidak ada data lembur</p>
            )}
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-center mb-4 text-gray-700">
              Boxplot Pulang Cepat
            </h3>
            {data.pulangCepat && data.pulangCepat.max > 0 ? (
              <Bar data={boxData} />
            ) : (
              <p className="text-center text-gray-400">
                Tidak ada data pulang cepat
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}