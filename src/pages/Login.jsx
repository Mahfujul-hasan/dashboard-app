import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import useAxiosSecure from "../hooks/useAxiosSecure";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosSecure.post("/api/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      // small success delay animation
      setTimeout(() => {
        navigate("/dashboard");
      }, 600);
    } catch (error) {
      console.error("Login error", error);
      alert("Login failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-200 overflow-hidden">
      {/* Animated Card */}
      <motion.form
        onSubmit={handleLogin}
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-96 border border-white/40"
      >
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold mb-8 text-center text-gray-800"
        >
          Log in to continue with Dozeno.
        </motion.h2>

        {/* Email Input */}
        <motion.input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          whileFocus={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="w-full p-3 border border-gray-200 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
        />

        {/* Password Input */}
        <motion.input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          whileFocus={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="w-full p-3 border border-gray-200 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
        />

        {/* Animated Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-xl font-medium shadow-lg"
        >
          Login
        </motion.button>
      </motion.form>
    </div>
  );
}
