"use server";

import { fetchQuery } from "convex/nextjs";
import { api } from "~/convex/_generated/api";
import { verifyAdmin } from "~/auth/core/session";

export async function getAllLocations() {
  if (! await verifyAdmin()) return "Unauthorized!";
  
  return await fetchQuery(api.queries.location.getAllLocations, {});

}