import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        email,
        password,
      });
      if (res.data.success) {
        localStorage.setItem("isAdmin", "true"); // ✅ store as string
        navigate("/admin/add-car");
        window.location.reload(); // ✅ so main.jsx picks up the new state
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-black text-center">
          Admin Login
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 placeholder-gray-400 text-black border rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-3 placeholder-gray-400 text-black border rounded-lg"
        />
        <button
          type="submit"
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg font-semibold"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
