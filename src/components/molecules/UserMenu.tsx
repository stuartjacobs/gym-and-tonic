"use client";

import Link from "next/link";
import { Avatar } from "../atoms/Avatar";

interface UserMenuProps {
  isSignedIn: boolean;
  userName?: string;
  userAvatar?: string;
}

export function UserMenu({ isSignedIn, userName, userAvatar }: UserMenuProps) {
  if (!isSignedIn) {
    return (
      <Link
        href="/sign-in"
        className="px-4 py-2 bg-[#BFFF00] text-[#0A0A0A] text-sm font-semibold rounded-lg hover:bg-[#D4FF33] transition-colors"
      >
        Sign In
      </Link>
    );
  }

  return (
    <Link href="/profile" className="flex items-center gap-2 group">
      <Avatar src={userAvatar} alt={userName || "User"} size="sm" />
    </Link>
  );
}
