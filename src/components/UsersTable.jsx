import { GoDotFill } from "react-icons/go";
import avatar1 from "/avatar1.avif";
import avatar2 from "/avatar2.png";
import avatar3 from "/avatar3.jpg";
import avatar4 from "/avatar4.webp";
import avatar5 from "/avatar5.webp";
import { motion, AnimatePresence } from "motion/react";

export default function UsersTable({ users }) {
  const icons = [avatar1, avatar2, avatar3, avatar4, avatar5];

  // Animation variants for list items
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.03 },
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm p-3 sm:p-4 w-full">
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
          Users
        </h2>
        <button className="text-green-800 border border-green-800 px-3 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-green-50 transition">
          + New
        </button>
      </div>

      <ul className="flex flex-col gap-2 sm:gap-3">
        <AnimatePresence>
          {users.map((user, index) => (
            <motion.li
              key={user.id}
              className="flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              whileHover="hover"
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="flex items-center gap-2 min-w-0">
                <motion.img
                  src={icons[index % icons.length]}
                  alt={user.name}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover shrink-0"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                />
                <div className="min-w-0">
                  <p className="text-gray-900 font-medium text-sm truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-400 truncate">{user.email}</p>
                </div>
              </div>
              <motion.span
                className={`shrink-0 ${
                  user.status === "active" ? "text-green-500" : "text-red-500"
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 + 0.2 }}
              >
                <GoDotFill />
              </motion.span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
