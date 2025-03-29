"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  UserGroupIcon,
  BuildingStorefrontIcon,
  AcademicCapIcon             
} from '@heroicons/react/24/solid';


const links = [
  { name: "Home", href: "/admin", icon: HomeIcon },
  { name: "Users", href: "/students", icon: UserGroupIcon },
  { name: "Classes", href: "/classes", icon: AcademicCapIcon },
  { name: "Locations", href: "/locations", icon: BuildingStorefrontIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
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
    </>
  );
}