import { FaCrown, FaRocket, FaPuzzlePiece, FaChartLine } from "react-icons/fa";
import { motion, AnimatePresence } from "motion/react";

export default function ProductsTable({ products }) {
  const icons = [
    <FaCrown className="text-blue-600 text-lg sm:text-xl" />,
    <FaRocket className="text-green-600 text-lg sm:text-xl" />,
    <FaChartLine className="text-yellow-500 text-lg sm:text-xl" />,
    <FaPuzzlePiece className="text-purple-600 text-lg sm:text-xl" />,
  ];

  // Animation variants for list items
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.03 },
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 w-full shadow-sm">
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
          Products
        </h2>
        <button className="text-green-800 border border-green-800 px-3 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-green-50 transition">
          + New
        </button>
      </div>

      <ul className="flex flex-col gap-2 sm:gap-3">
        <AnimatePresence>
          {products.map((item, index) => (
            <motion.li
              key={item.id}
              className="flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              whileHover="hover"
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <motion.div
                  className="shrink-0"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  {icons[index % icons.length]}
                </motion.div>
                <div className="min-w-0">
                  <p className="text-gray-900 font-medium text-sm sm:text-base truncate">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>
              <motion.span
                className={`shrink-0 text-xs px-2 sm:px-3 py-0.5 rounded-2xl whitespace-nowrap ${
                  item.category === "subscription"
                    ? "text-green-500 bg-green-100 border border-green-500"
                    : "text-red-500 bg-red-100 border border-red-500"
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 + 0.2 }}
              >
                {item.category}
              </motion.span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
