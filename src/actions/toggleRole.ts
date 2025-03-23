"use server";

import { api } from "~/convex/_generated/api";
import { fetchMutation } from "convex/nextjs";
import { getCurrentUser } from "~/auth/currentUser";
import { cookies } from "next/headers";
import { updateUserSessionData } from "~/auth/core/session";

export async function toggleRole() {
  const user = await getCurrentUser({ redirectIfNotFound: true });
  if (user.role === "user") {
    user.role = "admin";
  }else { 
    user.role = "user";
  }
  await updateUserSessionData(user, await cookies());
}