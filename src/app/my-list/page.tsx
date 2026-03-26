"use client";

import Link from "next/link";
import { ShowLayout } from "@/components/templates/ShowLayout";
import { Button } from "@/components/atoms/Button";

export default function MyListPage() {
  // In production, this would check Clerk auth and fetch user's list
  // For now, show auth prompt

  return (
    <ShowLayout>
      <div className="flex items-center justify-center min-h-[70vh] px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-[#BFFF00]/10 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-[#BFFF00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#F5F5F5] mb-3">My List</h1>
          <p className="text-[#A3A3A3] mb-6">
            Sign in to save your favorite shows and pick up where you left off.
          </p>
          <Link href="/sign-in">
            <Button size="lg">Sign In to Get Started</Button>
          </Link>
        </div>
      </div>
    </ShowLayout>
  );
}
