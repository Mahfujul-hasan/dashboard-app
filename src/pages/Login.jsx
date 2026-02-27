import { useState } from "react";
import { useNavigate } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";

export default function Login() {
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const handleLogin = async(e)=>{
      e.preventDefault();
      console.log(email, password);
        try {
            const res = await axiosSecure.post("/api/login",{
                email,
                password,
            });
            console.log(res.data);
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
        } catch (error) {
          console.log(error);
            console.error("Login error",error);
            alert("Login failed");
        }
    };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-green-600 text-white p-3 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
