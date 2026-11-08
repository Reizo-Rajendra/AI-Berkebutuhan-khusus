"use client";

import Image from "next/image";

interface ThemeLogoProps {
  height?: number;
  className?: string;
}

export function ThemeLogo({ height = 32, className }: ThemeLogoProps) {
  return (
    <Image
      src="/logo/LogoBlack.svg"
      alt="POLANITAS"
      height={height}
      width={height * 4}
      style={{ height, width: "auto" }}
      className={`object-contain ${className ?? ""}`}
      priority
    />
  );
}
