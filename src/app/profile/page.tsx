"use client";

import Link from "next/link";
import { ShowLayout } from "@/components/templates/ShowLayout";
import { Button } from "@/components/atoms/Button";

export default function ProfilePage() {
  return (
    <ShowLayout>
      <div className="flex items-center justify-center min-h-[70vh] px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-[#1C1C1C] flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-[#A3A3A3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#F5F5F5] mb-3">Profile</h1>
          <p className="text-[#A3A3A3] mb-6">
            Sign in to manage your profile and preferences.
          </p>
          <Link href="/sign-in">
            <Button size="lg">Sign In</Button>
          </Link>
        </div>
      </div>
    </ShowLayout>
  );
}
