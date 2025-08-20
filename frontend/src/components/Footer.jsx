import React from "react";
import { ClipboardList } from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-10 relative z-10">
      <div className="container mx-auto px-4">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Left Section */}
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <div className="flex justify-center md:justify-start items-center space-x-2">
              <ClipboardList className="w-6 h-6" />
              <span className="font-bold text-xl">
                Analisis Absensi Karyawan
              </span>
            </div>
            <p className="mt-2 text-blue-100">
              Cabang Jakarta &amp; Surabaya
            </p>
          </div>

          {/* Navigation */}
          <div className="grid grid-cols-2 md:flex md:space-x-6 gap-3 text-center md:text-left">
            {["Home", "Findings", "Insights", "Recommendations", "Roadmap"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative group transition"
                >
                  {item}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-300"></span>
                </a>
              )
            )}
          </div>
        </motion.div>

        {/* Bottom Text */}
        <motion.div
          className="border-t border-blue-500/40 mt-8 pt-6 text-center text-blue-100 text-sm"
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <p>
            © 2025{" "}
            <a
              href="https://instagram.com/vickynfrdnto"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:text-white hover:underline transition"
            >
              Vicky Nanda Ferdianto
            </a>
            . All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}