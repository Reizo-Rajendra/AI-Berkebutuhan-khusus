"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  HandMetal,
  Eye,
  Mic,
  MousePointer2,
  BookOpen,
  HeartHandshake,
  HelpCircle,
} from "lucide-react";

const NAV_SECTIONS = [
  {
    label: "Utama",
    items: [
      { href: "/dashboard",                   label: "Beranda",         Icon: LayoutDashboard },
      { href: "/dashboard/sign-to-voice",     label: "TanganBicara AI", Icon: HandMetal       },
      { href: "/dashboard/vision-describer",  label: "Mata AI",         Icon: Eye             },
    ],
  },
  {
    label: "Aksesibilitas",
    items: [
      { href: "/dashboard/voice-commands",   label: "Navigasi Suara",  Icon: Mic             },
      { href: "/dashboard/eye-tracking",     label: "Pelacak Mata",    Icon: MousePointer2   },
    ],
  },
  {
    label: "Panduan",
    items: [
      { href: "/dashboard/hak-disabilitas", label: "Hak Disabilitas", Icon: HeartHandshake  },
      { href: "/dashboard/panduan",         label: "Bantuan",         Icon: HelpCircle      },
      { href: "/dashboard/learn",           label: "Pelajari Lebih",  Icon: BookOpen        },
    ],
  },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <>
      {NAV_SECTIONS.map((section) => (
        <div key={section.label}>
          <div className="nav-section">{section.label}</div>
          {section.items.map(({ href, label, Icon }) => {
            const isActive =
              href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                className={`nav-item ${isActive ? "nav-item--active" : ""}`}
              >
                <Icon size={15} strokeWidth={2} className="shrink-0" />
                {label}
              </Link>
            );
          })}
        </div>
      ))}
    </>
  );
}
