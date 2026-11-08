"use client";

import { HeartHandshake } from "lucide-react";

export function UserChip() {
  return (
    <div className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-[#E9E4FF] bg-white text-[0.8125rem] font-bold text-[#4C3D8A] shadow-sm">
      <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center">
        <HeartHandshake size={13} className="text-violet-600" />
      </div>
      <span className="hidden sm:inline">Pengguna</span>
    </div>
  );
}
