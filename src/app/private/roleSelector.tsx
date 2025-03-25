"use client";

import { type Infer, v } from "convex/values";
import { useEffect, useState } from "react";
import { 
  Select, 
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "~/components/ui/select";
import { toggleRole } from "~/actions/toggleRole";
import { Roles } from "~/auth/schemas";

const roles = v.array(v.union(v.literal("user"), v.literal("teacher"), v.literal("admin")));

export function RoleSelector(
  { 
    userRoles, 
    sessionRole 
  }: {
    userRoles: Infer<typeof roles> | null, 
    sessionRole: string 
  }) {
    
    const [userRole, setRole] = useState(sessionRole);
  
    useEffect(() => {
      "use server";
      console.log("VALUE CHANGED TO: " + userRole)
      toggleRole(userRole as Roles );
    },[userRole])
  

  return (
    <Select onValueChange={(value: string) => setRole(value)} value={userRole}>
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder={sessionRole} />
      </SelectTrigger>
      <SelectContent>
        {userRoles && userRoles.map((role) => (
          <SelectItem key={role} value={role}>{role}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )  

}
