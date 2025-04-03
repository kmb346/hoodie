"use server";

import { fetchQuery, fetchMutation } from "convex/nextjs";
import { api } from "~/convex/_generated/api";
import { verifyAdmin } from "~/auth/core/session";

export async function getAllStaff() {
  if (!verifyAdmin()) return "Unauthorized!";
  
  return await fetchQuery(api.queries.user.getStaffUsers, {});

}