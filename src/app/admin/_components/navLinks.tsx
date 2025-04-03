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
  { name: "Home", href: "/admin", icon: HomeIcon },
  { name: "Students", href: "/admin/students", icon: UserGroupIcon },
  { name: "Staff", href: "/admin/staff", icon: UserIcon },
  { name: "Classes", href: "/admin/classes", icon: AcademicCapIcon },
  { name: "Locations", href: "/admin/locations", icon: BuildingStorefrontIcon },
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