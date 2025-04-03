import { type Infer, v } from "convex/values";
import { brandedString } from "convex-helpers/validators";
import { type Id } from "~/convex/_generated/dataModel";

const emailValidator = brandedString("email");
const stringValidator = v.string();
const optionalString = v.optional(v.string());
const optionalNumber = v.optional(v.number());
const status = v.union(v.literal("active"), v.literal("inactive"));
const roles = v.union(v.literal("user"), v.literal("teacher"), v.literal("admin"));

export type AdminUser = {
  _id: Id<"user">,
  first_name: Infer<typeof stringValidator>,
  last_name: Infer<typeof stringValidator>,
  email: Infer<typeof stringValidator>,
  postal_code: Infer<typeof optionalString>,
  prefecture: Infer<typeof optionalString>,
  city: Infer<typeof optionalString>,
  address: Infer<typeof optionalString>,
  role: Infer<typeof roles>[],
  status: Infer<typeof status>
}
