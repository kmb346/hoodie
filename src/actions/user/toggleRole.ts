"use server";

import { getCurrentUser } from "~/auth/currentUser";
import { cookies } from "next/headers";
import { updateUserSessionData } from "~/auth/core/session";
import { Roles } from "~/auth/schemas";


export async function toggleRole(role: Roles) {
  const user = await getCurrentUser({ redirectIfNotFound: true });
  if (user.role !== role) {
    user.role = role;
    await updateUserSessionData(user, await cookies());
  }
  
}