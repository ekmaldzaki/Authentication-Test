"use client";
import AuthForm from "@/components/AuthForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-300 flex items-center justify-center text-black">
      <AuthForm type="register" />
    </div>
  );
}
