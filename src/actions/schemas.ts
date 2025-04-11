import { type Infer, v } from "convex/values";
import { brandedString } from "convex-helpers/validators";
import { type Id } from "~/convex/_generated/dataModel";

const emailValidator = brandedString("email");
const stringValidator = v.string();
const optionalString = v.optional(v.string());
const optionalNumber = v.optional(v.number());
const numberValidator = v.number();
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

export type Student = {
  _id: Id<"student">,
  first_name: Infer<typeof stringValidator>,
  last_name: Infer<typeof stringValidator>,
  user_id: Id<"user">,
  grade: Infer<typeof stringValidator>,
  default_class: Id<"class">,
  birthdate: Infer<typeof optionalNumber>,
  profile_pic: Infer<typeof optionalString>,
  created_on: Infer<typeof numberValidator>,
  updated_on: Infer<typeof optionalNumber>,
  last_login: Infer<typeof optionalNumber>,
  status: Infer<typeof status>
}

export type Location = {
  _id: Id<"location">,
  name: Infer<typeof stringValidator>,
  address: Infer<typeof optionalString>,
  prefecture: Infer<typeof optionalString>,
  city: Infer<typeof optionalString>,
  postal_code: Infer<typeof optionalString>,
  building: Infer<typeof optionalString>,
  phone: Infer<typeof stringValidator>,
}

export type ClassSchema = {
  _id: Id<"class">,
  name: Infer<typeof stringValidator>,
  teacher_id?: Id<"staff"> | undefined,
  def_day?: Infer<typeof optionalString>,
  def_time?: Infer<typeof optionalNumber>,
  def_room_id?: Id<"room"> | undefined,
  student_limit: Infer<typeof numberValidator>
}