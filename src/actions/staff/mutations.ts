import { verifyAdmin } from "~/auth/core/session";
import { AdminUser } from "../schemas";
import { fetchMutation } from "convex/nextjs";
import { api } from "~/convex/_generated/api";

export async function createStaffUser(data: AdminUser) {
  //if (! await verifyAdmin()) return "Unauthorized!";

  const user = await fetchMutation(api.mutations.user.createUser, {
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    role: data.role ?? ["teacher"],
    status: "active",
    createdAt: Date.now(),
    updatedAt: Date.now(), 
    last_login: Date.now(),
    password: "",
    pwSalt: "",
  });

  return user;
}