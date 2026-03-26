"use client";

import { AuthLayout } from "@/components/templates/AuthLayout";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <AuthLayout>
      <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-8 text-center">
        <h1 className="text-2xl font-bold text-[#F5F5F5] mb-2">Join the Fun</h1>
        <p className="text-sm text-[#A3A3A3] mb-6">Create an account to start your comedy fitness journey</p>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Full name"
            className="w-full px-4 py-3 bg-[#1C1C1C] border border-[#2A2A2A] rounded-lg text-[#F5F5F5] placeholder-[#666] text-sm focus:outline-none focus:border-[#BFFF00]/50"
          />
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-3 bg-[#1C1C1C] border border-[#2A2A2A] rounded-lg text-[#F5F5F5] placeholder-[#666] text-sm focus:outline-none focus:border-[#BFFF00]/50"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 bg-[#1C1C1C] border border-[#2A2A2A] rounded-lg text-[#F5F5F5] placeholder-[#666] text-sm focus:outline-none focus:border-[#BFFF00]/50"
          />
          <button className="w-full py-3 bg-[#BFFF00] text-[#0A0A0A] rounded-lg text-sm font-bold hover:bg-[#D4FF33] transition-colors">
            Create Account
          </button>
        </div>

        <p className="text-sm text-[#A3A3A3] mt-6">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-[#BFFF00] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
