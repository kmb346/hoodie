"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  UserIcon,
  UserGroupIcon,
  BuildingStorefrontIcon,
  AcademicCapIcon             
} from '@heroicons/react/24/solid';
import { useTranslations } from "next-intl";




export default function NavLinks() {
  
  const pathname = usePathname();
  const t = useTranslations("dashboard.admin.nav");
  const links = [
    { name: t("home"), href: "/dashboard/admin", icon: HomeIcon },
    { name: t("students"), href: "/dashboard/admin/students", icon: UserGroupIcon },
    { name: t("staff"), href: "/dashboard/admin/staff", icon: UserIcon },
    { name: t("classes"), href: "/dashboard/admin/classes", icon: AcademicCapIcon },
    { name: t("locations"), href: "/dashboard/admin/locations", icon: BuildingStorefrontIcon },
  ];

  return (
    <div className="flex h-full">
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={(pathname == link.href ? "bg-blue-900" : "bg-blue-400") + "text-white h-full flex items-center gap-x-1 [&:hover]:bg-blue-600 px-5"}
          >
            <LinkIcon className="w-6 fill-lightgray" />
            <span className="text-lightgray">{link.name}</span>
          </Link>
        )
      })}
    </div>
  );
}