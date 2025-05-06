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


const links = [
  { name: "Home", href: "/dashboard/admin", icon: HomeIcon },
  { name: "Students", href: "/dashboard/admin/students", icon: UserGroupIcon },
  { name: "Staff", href: "/dashboard/admin/staff", icon: UserIcon },
  { name: "Classes", href: "/dashboard/admin/classes", icon: AcademicCapIcon },
  { name: "Locations", href: "/dashboard/admin/locations", icon: BuildingStorefrontIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

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