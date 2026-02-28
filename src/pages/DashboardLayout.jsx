import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { motion } from "motion/react";

import { Outlet } from "react-router";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-white min-h-screen max-w-7xl mx-auto">
      {/* Overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar for mobile */}
      <div
        className={`fixed top-0 left-0 h-full z-50 transition-transform duration-300 lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      <div className="flex">
        {/* Sidebar for large */}
        <div className="hidden lg:block w-64 shrink-0 min-h-screen p-4">
          <Sidebar />
        </div>

        {/* Main content */}
        <motion.div
          animate={{ opacity: [0, 1], y: [20, 0] }}
          transition={{ duration: 0.5, staggerChildren: 0.08 }}
          className="flex-1 min-w-0 p-3 sm:p-4 lg:p-6"
        >
          <motion.div
            animate={{ opacity: [0, 1], y: [20, 0] }}
            transition={{ duration: 0.4 }}
          >
            <Header onMenuClick={() => setSidebarOpen(true)} />
          </motion.div>

          <Outlet/>
        </motion.div>
      </div>
    </div>
  );
}
