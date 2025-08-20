import React, { useState } from "react";
import {
  Database,
  Monitor,
  ClipboardList,
  Smartphone,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Recommendations() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const recommendations = [
    {
      title: "Perbaikan Data",
      icon: <Database className="w-5 h-5 mr-2" />,
      content: [
        "Implementasikan validasi otomatis untuk jam masuk/keluar & shift.",
        "Standarisasi format pencatatan absensi di semua cabang dan departemen.",
        "Buat prosedur untuk menangani data yang hilang atau tidak valid.",
        "Lakukan audit data berkala untuk memastikan akurasi.",
      ],
    },
    {
      title: "Monitoring Kinerja",
      icon: <Monitor className="w-5 h-5 mr-2" />,
      content: [
        "Buat KPI dashboard absensi dengan metrik: ketepatan waktu, frekuensi lembur, dan insiden pulang cepat.",
        "Implementasikan sistem notifikasi untuk pola absensi yang tidak biasa.",
        "Buat laporan mingguan untuk manajemen dengan highlight isu penting.",
        "Identifikasi karyawan dengan pola absensi bermasalah untuk tindakan HR.",
      ],
    },
    {
      title: "Kebijakan HR",
      icon: <ClipboardList className="w-5 h-5 mr-2" />,
      content: [
        "Review kebijakan lembur dengan mempertimbangkan beban kerja dan kompensasi.",
        "Tegakkan aturan absensi secara konsisten di semua cabang.",
        "Buat program penghargaan untuk karyawan dengan rekam jejak absensi baik.",
        "Implementasikan program pelatihan manajemen waktu untuk karyawan dengan masalah absensi.",
      ],
    },
    {
      title: "Digitalisasi Sistem",
      icon: <Smartphone className="w-5 h-5 mr-2" />,
      content: [
        "Terapkan sistem biometrik atau aplikasi absensi mobile untuk mengurangi manipulasi data.",
        "Integrasikan sistem absensi dengan payroll untuk otomatisasi perhitungan.",
        "Buat portal self-service untuk karyawan melihat riwayat absensi mereka.",
        "Implementasikan sistem approval online untuk lembur dan izin.",
      ],
    },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section id="recommendations" className="py-16 bg-white relative z-10">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl font-bold text-center mb-12 text-blue-600"
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          Recommendations
        </motion.h2>

        <div className="max-w-3xl mx-auto">
          {recommendations.map((item, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="mb-4 border border-gray-200 rounded-xl shadow-sm overflow-hidden"
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

              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="bg-white border-t"
                  >
                    <ul className="list-disc pl-8 pr-4 py-4 space-y-2 text-gray-700">
                      {item.content.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}