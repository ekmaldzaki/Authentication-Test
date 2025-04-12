"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 to-indigo-300 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full text-center space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Welcome ✨</h1>
        <p className="text-gray-600">
          Start your journey — login or create an account.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => router.push("/login")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
          >
            Login
          </button>
          <button
            onClick={() => router.push("/register")}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition"
          >
            Register
          </button>
        </div>
      </div>
    </main>
  );
}
