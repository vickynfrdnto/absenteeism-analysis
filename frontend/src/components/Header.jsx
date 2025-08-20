import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardList, Menu } from "lucide-react";

const fadeInDown = {
  hidden: { opacity: 0, y: -20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerLinks = {
  hidden: { opacity: 0, y: -10 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
  }),
};

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { id: "home", label: "Home" },
    { id: "findings", label: "Key Findings" },
    { id: "insights", label: "Data Insights" },
    { id: "recommendations", label: "Recommendations" },
    { id: "roadmap", label: "Roadmap" },
  ];

  return (
    <motion.nav
      className="bg-blue-600 text-white shadow-lg sticky top-0 z-50"
      variants={fadeInDown}
      initial="hidden"
      animate="show"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo + Title */}
          <motion.div
            className="flex items-center space-x-2"
            variants={fadeInDown}
          >
            <ClipboardList className="w-6 h-6" />
            <span className="font-bold text-xl">
              Analisis Absensi Karyawan
            </span>
          </motion.div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-6">
            {links.map((link, i) => (
              <motion.a
                key={link.id}
                href={`#${link.id}`}
                className="hover:text-blue-200 transition"
                custom={i}
                variants={staggerLinks}
                initial="hidden"
                animate="show"
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile menu (animated) */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="md:hidden py-2"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {links.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  className="block py-2 hover:bg-blue-500 px-2 rounded"
                  custom={i}
                  variants={staggerLinks}
                  initial="hidden"
                  animate="show"
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}