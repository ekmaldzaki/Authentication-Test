"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push("/login");
      } else {
        setEmail(data.user.email ?? null);
      }
    };
    checkUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setShowModal(false);
    router.push("/");
  };

  if (!email) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg space-y-6">
        {/* Dashboard Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-800">Welcome!</h1>
          <p className="text-lg text-gray-500">
            Logged in as <span className="font-semibold">{email}</span>
          </p>
        </div>

        {/* Dashboard Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => router.push("/dashboard")}
            className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Go to Profile
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="bg-red-600 text-white py-3 px-6 rounded-lg shadow hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Modal with backdrop blur */}
      {showModal && (
        <div className="fixed inset-0 mt-8 flex items-start justify-center bg-opacity-40 backdrop-blur-sm z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Are you sure you want to logout?
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              You will be logged out and returned to the homepage.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
