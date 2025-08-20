// frontend/src/components/Hero.jsx
import React from "react";
import { motion } from "framer-motion";
import HeroBackground3D from "./HeroBackground3D";

export default function Hero() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center text-white bg-[#1e3a8a]"
    >
      {/* Background Particles */}
      <HeroBackground3D />

      {/* Content */}
      <div className="container mx-auto px-6 py-20 md:py-0 relative z-10 text-center">
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-pink-500 drop-shadow-lg"
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          Analisis Absensi Karyawan
        </motion.h1>

        <motion.h2
          className="text-xl md:text-2xl font-semibold mb-6 text-cyan-400"
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Cabang Jakarta & Surabaya
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed text-cyan-300"
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          Website ini menampilkan hasil analisis data absensi dari dataset test Data Analyst di Ikigai. 
          Data mencakup{" "}
          <span className="text-cyan-400 font-semibold">406 catatan</span> absensi karyawan dari dua cabang (Jakarta & Surabaya), 
          dua departemen (Kasir & OB), serta mencatat jam masuk, jam keluar, shift, keterlambatan, pulang cepat, dan lembur.
        </motion.p>

        <motion.a
          href="#findings"
          className="inline-block bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:opacity-90 hover:shadow-cyan-500/40 transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          🚀 Lihat Analisis
        </motion.a>
      </div>
    </section>
  );
}