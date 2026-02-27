import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import UsersTable from "../components/UsersTable";
import ProductsTable from "../components/ProductsTable";
import useAxiosSecure from "../hooks/useAxiosSecure";
import ProjectAnalyticsChart from "../components/AnalyticsChart";
import ProjectProgress from "../components/ProjectProgress";
import Reminders from "../components/Reminders";
import TimeTracker from "../components/TimeTracker";
import { motion } from "motion/react";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get("/api/dashboard").then((res) => {
      setData(res.data);
    });
  }, [axiosSecure]);

  if (!data)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-green-700 border-t-transparent"></div>
      </div>
    );

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

          <div className="bg-gray-100 p-3 sm:p-4 md:p-6 my-3 space-y-3 rounded-2xl sm:rounded-3xl">
            {/* Title + Buttons */}
            <motion.div
              animate={{ opacity: [0, 1], y: [20, 0] }}
              transition={{ duration: 0.4 }}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            >
              <div>
                <h3 className="text-2xl sm:text-3xl font-medium">Dashboard</h3>
                <p className="text-gray-500 text-sm sm:text-base">
                  Plan, prioritize, and accomplish your tasks with ease.
                </p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white hover:bg-radial-[at_25%_75%] from-[#3a753d] to-[#154c33] px-4 py-2 sm:px-5 sm:py-3 rounded-full text-green-700 hover:text-white border border-green-700 text-sm sm:text-base font-bold whitespace-nowrap"
                >
                  + Add Product
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white hover:bg-radial-[at_25%_75%] from-[#3a753d] to-[#154c33] px-4 py-2 sm:px-5 sm:py-3 rounded-full text-green-700 hover:text-white border border-green-700 text-sm sm:text-base font-bold whitespace-nowrap"
                >
                  Import Data
                </motion.button>
              </div>
            </motion.div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
              {[
                { title: "Total Users", value: data.overview.totalUsers },
                { title: "Active Users", value: data.overview.activeUsers },
                { title: "Revenue", value: `$${data.overview.revenue}` },
                { title: "Growth", value: `${data.overview.growth}%` },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  animate={{ opacity: [0, 1], y: [20, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  <StatCard title={stat.title} value={stat.value} />
                </motion.div>
              ))}
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-3">
              <motion.div
                animate={{ opacity: [0, 1], y: [20, 0] }}
                transition={{ duration: 0.4 }}
                className="xl:col-span-3 flex flex-col gap-3"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="md:col-span-2 min-h-55 sm:min-h-65">
                    <ProjectAnalyticsChart />
                  </div>
                  <div className="md:col-span-1">
                    <Reminders />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <ProductsTable products={data.products} />
                  <div className="min-h-55">
                    <ProjectProgress />
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ opacity: [0, 1], y: [20, 0] }}
                transition={{ duration: 0.4 }}
                className="xl:col-span-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-3"
              >
                <UsersTable users={data.users} />
                <div className="min-h-40 sm:min-h-45">
                  <TimeTracker />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
