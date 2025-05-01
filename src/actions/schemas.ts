import { type Infer, v } from "convex/values";
import { brandedString } from "convex-helpers/validators";
import { type Id } from "~/convex/_generated/dataModel";

const emailValidator = brandedString("email");
const stringValidator = v.string();
const optionalString = v.optional(v.string());
const optionalNumber = v.optional(v.number());
const numberValidator = v.number();
const intValidator = v.int64();
const status = v.union(v.literal("active"), v.literal("inactive"));
const adminRoles = v.array(v.union(v.literal("teacher"), v.literal("admin")));
const grades = v.union(
  v.literal("Pre-k"), 
  v.literal("K"), 
  v.literal("1"), 
  v.literal("2"), 
  v.literal("3"), 
  v.literal("4"), 
  v.literal("5"), 
  v.literal("6"), 
  v.literal("7"), 
  v.literal("8"), 
  v.literal("9"), 
  v.literal("10"), 
  v.literal("11"), 
  v.literal("12"), 
  v.literal("Adult"),
  v.literal("Other")
);

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

export const TIMES = [
  "9:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
];

export type Grade = Infer<typeof grades>;

export type UserData = {
  first_name: Infer<typeof stringValidator>,
  last_name: Infer<typeof stringValidator>,
  email: Infer<typeof stringValidator>,
  postal_code: Infer<typeof optionalString>,
  prefecture: Infer<typeof optionalString>,
  city: Infer<typeof optionalString>,  
  address: Infer<typeof optionalString>,
  status: Infer<typeof status>
}

export type AdminUser = {
  role: Infer<typeof adminRoles>,
  user_id: Id<"user">,
  userData: UserData
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
  def_time?: Infer<typeof optionalString>,
  def_room_id?: Id<"room"> | undefined,
  student_limit: Infer<typeof intValidator>
}