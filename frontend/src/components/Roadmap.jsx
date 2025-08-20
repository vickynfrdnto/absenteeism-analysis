import React from "react";
import { motion } from "framer-motion";

export default function Roadmap() {
  const phases = [
    {
      title: "Jangka Pendek (0-3 bulan)",
      phaseTitle: "Fase Implementasi Awal",
      items: [
        "Data cleaning dan validasi",
        "Pembuatan laporan absensi mingguan",
        "Pelatihan staf HR untuk sistem baru",
        "Pilot project sistem absensi digital di 1 cabang",
      ],
    },
    {
      title: "Jangka Menengah (3-6 bulan)",
      phaseTitle: "Fase Konsolidasi",
      items: [
        "Peluncuran dashboard absensi (Power BI/Tableau)",
        "Implementasi sistem absensi digital di semua cabang",
        "Review kebijakan absensi dan lembur",
        "Program penghargaan absensi terbaik",
      ],
    },
    {
      title: "Jangka Panjang (6-12 bulan)",
      phaseTitle: "Fase Optimalisasi",
      items: [
        "Analisis tren produktivitas vs pola absensi",
        "Optimasi alokasi shift berdasarkan data",
        "Implementasi kebijakan lembur baru",
        "Integrasi sistem dengan payroll dan HRIS",
      ],
    },
  ];

  return (
    <section id="roadmap" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 relative">
        <h2
          className="text-3xl font-bold text-center mb-12 
          bg-clip-text text-transparent bg-gradient-to-r 
          from-cyan-400 via-fuchsia-500 to-pink-500 drop-shadow-lg"
        >
          Implementation Roadmap
        </h2>

        {/* Timeline Line */}
        <div className="relative max-w-5xl mx-auto">
          <div className="absolute left-1/2 top-0 h-full w-1 bg-blue-200 transform -translate-x-1/2"></div>

          <div className="space-y-16">
            {phases.map((phase, idx) => {
              const isLeft = idx % 2 === 0;

              return (
                <motion.div
                  key={idx}
                  className="relative flex items-center"
                  initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  {/* Card */}
                  <div
                    className={`w-full md:w-1/2 px-6 ${
                      isLeft
                        ? "md:pr-12 md:text-right"
                        : "md:pl-12 md:text-left ml-auto"
                    }`}
                  >
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-md inline-block mb-2 font-semibold">
                        {phase.title}
                      </div>
                      <h4 className="font-bold text-lg mb-3 text-blue-800">
                        {phase.phaseTitle}
                      </h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        {phase.items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 bg-blue-500 w-6 h-6 rounded-full border-4 border-white shadow-md z-10"></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}