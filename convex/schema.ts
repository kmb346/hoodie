import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  user: defineTable({
    password: v.string(),
    first_name: v.string(),
    last_name: v.string(),
    username: v.string(),
    postal_code: v.optional(v.string()),
    prefecture: v.optional(v.string()),
    city: v.optional(v.string()),
    address: v.optional(v.string()),
    emailVerified: v.optional(v.number()), // Assuming DateTime is a timestamp
    profile_pic: v.optional(v.string()),
    createdAt: v.number(), // Assuming DateTime is a timestamp
    updatedAt: v.number(), // Assuming DateTime is a timestamp
    last_login: v.optional(v.number()), // Assuming DateTime is a timestamp
    status: v.string(),
    pwSalt: v.string(),
  }).index("username", ["username"]),
  role: defineTable({
    name: v.string(),
  }).index("name", ["name"]),
  user_role: defineTable({
    user_id: v.id("user"),
    role_id: v.id("role"),
  }).index("role_id_user_id", ["role_id", "user_id"]),
  session: defineTable({
    userId: v.id("user"),
    expiresAt: v.number(), // Assuming DateTime is a timestamp
    createdAt: v.optional(v.number()), // Assuming DateTime is a timestamp
    updatedAt: v.optional(v.number()), // Assuming DateTime is a timestamp
  }).index("userId", ["userId"]),
  verification_token: defineTable({
    identifier: v.string(),
    token: v.string(),
    expires: v.number(), // Assuming DateTime is a timestamp
  }).index("identifier_token", ["identifier", "token"]),
  staff: defineTable({
    user_id: v.id("user"),
  }).index("user_id", ["user_id"]),
  customer: defineTable({
    user_id: v.id("user"),
  }).index("user_id", ["user_id"]),
  student: defineTable({
    password: v.string(),
    user_id: v.id("customer"),
    first_name: v.string(),
    last_name: v.string(),
    birthdate: v.optional(v.number()), // Assuming DateTime is a timestamp
    grade: v.string(),
    profile_pic: v.optional(v.string()),
    default_class: v.id("class"),
    created_on: v.number(), // Assuming DateTime is a timestamp
    updated_on: v.number(), // Assuming DateTime is a timestamp
    last_login: v.number(), // Assuming DateTime is a timestamp
    status: v.string(),
  }),
  class: defineTable({
    name: v.string(),
    teacher_id: v.optional(v.id("staff")),
    def_day: v.optional(v.string()),
    def_time: v.optional(v.number()), // Assuming DateTime is a timestamp
    def_room_id: v.optional(v.id("room")),
    student_limit: v.number(),
  }).index("name", ["name"]),
  location: defineTable({
    name: v.string(),
    postal_code: v.optional(v.string()),
    prefecture: v.optional(v.string()),
    city: v.optional(v.string()),
    address: v.optional(v.string()),
    building: v.optional(v.string()),
    phone: v.string(),
  }).index("name", ["name"]),
  room: defineTable({
    name: v.string(),
    location_name: v.id("location"),
    type: v.optional(v.string()),
  }).index("name_location_name", ["name", "location_name"]),
  class_session: defineTable({
    class_id: v.id("class"),
    class_date: v.number(), // Assuming DateTime is a timestamp
    start_time: v.number(), // Assuming DateTime is a timestamp
    duration: v.number(),
    room_id: v.optional(v.id("room")),
    staff_id: v.id("staff"),
  }),
  class_record: defineTable({
    session_id: v.id("class_session"),
    student_id: v.id("student"),
    attended: v.boolean(),
    early_late: v.optional(v.number()),
    assignment: v.optional(v.boolean()),
    assigment_score: v.optional(v.number()),
    note: v.optional(v.string()),
  }).index("session_id_student_id", ["session_id", "student_id"]),
  class_credit: defineTable({
    student_id: v.id("student"),
    session_id: v.id("class_session"),
    amount: v.number(),
    created_date: v.number(), // Assuming DateTime is a timestamp
    expiry_date: v.optional(v.number()), // Assuming DateTime is a timestamp
    used_date: v.optional(v.number()), // Assuming DateTime is a timestamp
  }),
  assignment: defineTable({
    name: v.string(),
    session_id: v.id("class_session"),
    created_date: v.number(), // Assuming DateTime is a timestamp
    Due_date: v.optional(v.number()), // Assuming DateTime is a timestamp
    score: v.optional(v.number()),
  }).index("name_session_id", ["name", "session_id"]),
  event: defineTable({
    type: v.string(),
    note: v.optional(v.string()),
    student_id: v.optional(v.id("student")),
    credit_id: v.optional(v.id("class_credit")),
    created_date: v.number(), // Assuming DateTime is a timestamp
    updated_on: v.number(), // Assuming DateTime is a timestamp
  }),
});