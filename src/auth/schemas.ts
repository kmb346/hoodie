import { type Infer, v } from "convex/values";
import { brandedString } from "convex-helpers/validators";
import { type Id } from "~/convex/_generated/dataModel";

const emailValidator = brandedString("email");
const stringValidator = v.string();
const roles = v.union(v.literal("user"), v.literal("teacher"), v.literal("admin"));

export type Roles = Infer<typeof roles>;

export type UserSession = {
  userId: Id<"user">;
  role: Infer<typeof roles>;
}

export type signInSchema = {
  email: Infer<typeof emailValidator>,
  password: Infer<typeof stringValidator>,
};

export type signUpSchema = { 
  first_name: Infer<typeof stringValidator>,
  last_name: Infer<typeof stringValidator>,
  email: Infer<typeof emailValidator>,
  password: Infer<typeof stringValidator>,
};