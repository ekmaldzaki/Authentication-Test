"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type Props = {
  type: "login" | "register";
};

export default function AuthForm({ type }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (type === "login") {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      setLoading(false);
      if (error) {
        alert(error.message);
      } else {
        router.push("/dashboard");
      }
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      setLoading(false);
      if (error) {
        alert(error.message);
      } else {
        alert("Berhasil daftar! Silakan login.");
        router.push("/login");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm space-y-4"
    >
      <h1 className="text-2xl font-semibold text-center text-gray-800">
        {type === "login" ? "Welcome Back 👋" : "Create an Account 🚀"}
      </h1>

      <div>
        <label className="text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="you@example.com"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="••••••••"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button
        disabled={loading}
        className={`w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading
          ? type === "login"
            ? "Logging in..."
            : "Registering..."
          : type === "login"
          ? "Login"
          : "Register"}
      </button>

      <p className="text-center text-sm text-gray-600">
        {type === "login" ? (
          <>
            Belum punya akun?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Daftar
            </a>
          </>
        ) : (
          <>
            Sudah punya akun?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </>
        )}
      </p>
    </form>
  );
}
