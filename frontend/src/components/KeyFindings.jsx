// frontend/src/components/KeyFindings.jsx
import React, { useState } from "react";
import {
  MapPinned,
  Users,
  AlertCircle,
  Clock,
  AlertTriangle,
  BarChart2,
  ChevronDown,
} from "lucide-react";

export default function KeyFindings() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const findings = [
    {
      title: "Distribusi Cabang",
      icon: <MapPinned className="w-5 h-5 mr-2" />,
      content: [
        "Cabang Jakarta (59%) lebih banyak data dibanding Surabaya (41%).",
        "Menunjukkan dominasi operasional di Jakarta.",
      ],
    },
    {
      title: "Distribusi Departemen",
      icon: <Users className="w-5 h-5 mr-2" />,
      content: [
        "Departemen Kasir mendominasi (70%) dibanding OB (30%).",
        "Rasio ini perlu dipertimbangkan untuk alokasi sumber daya.",
      ],
    },
    {
      title: "Data Shift Hilang",
      icon: <AlertCircle className="w-5 h-5 mr-2" />,
      content: [
        "44% data shift hilang, menunjukkan OB tidak memiliki sistem kerja shift.",
        "Perlu standardisasi pencatatan untuk semua departemen.",
      ],
    },
    {
      title: "Rata-rata Lembur",
      icon: <Clock className="w-5 h-5 mr-2" />,
      content: [
        "Rata-rata lembur 52 menit/hari.",
        "Terdapat kasus ekstrem hingga 288 menit.",
        "Perlu evaluasi beban kerja dan kompensasi.",
      ],
    },
    {
      title: "Pulang Cepat Ekstrem",
      icon: <AlertTriangle className="w-5 h-5 mr-2" />,
      content: [
        "Ada catatan pulang cepat ekstrem 281 menit.",
        "Indikasi bolos atau absensi tidak tercatat.",
        "Perlu investigasi lebih lanjut.",
      ],
    },
    {
      title: "Analisis Komparatif",
      icon: <BarChart2 className="w-5 h-5 mr-2" />,
      content: [
        "Perbedaan pola absensi signifikan antara cabang dan departemen.",
        "Rekomendasi kebijakan perlu disesuaikan dengan karakteristik masing-masing.",
      ],
    },
  ];

  return (
    <section
      id="findings"
      className="relative z-10 py-16 bg-slate-50"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">
          🔎 Key Findings
        </h2>
        <div className="max-w-3xl mx-auto">
          {findings.map((item, idx) => (
            <div
              key={idx}
              className="mb-4 border border-gray-200 rounded-lg overflow-hidden shadow-sm"
            >
              <button
                onClick={() => toggleAccordion(idx)}
                className="w-full flex justify-between items-center p-4 bg-blue-50 hover:bg-blue-100 transition"
              >
                <h3 className="text-lg font-semibold text-blue-800 flex items-center">
                  {item.icon}
                  {item.title}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    openIndex === idx ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === idx && (
                <div className="p-4 bg-white border-t">
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    {item.content.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}