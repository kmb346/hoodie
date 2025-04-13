import { internalMutation, mutation } from "../_generated/server";
import { v } from "convex/values";

export const createStudent = mutation({
  args: {
    password: v.string(),
    user_id: v.optional(v.id("user")),
    first_name: v.string(),
    last_name: v.string(),
    birthdate: v.optional(v.number()),
    grade: v.string(),
    profile_pic: v.optional(v.string()),
    default_class: v.optional(v.id("class")),
    created_on: v.number(),
    updated_on: v.number(),
    last_login: v.number(),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    console.log("BIRTHDATE: " + args.birthdate);
    const studentId = await ctx.db
      .insert("student", {
        password: args.password,
        user_id: args.user_id ?? undefined,
        first_name: args.first_name,
        last_name: args.last_name,
        birthdate: args.birthdate ?? 0,
        grade: args.grade,
        profile_pic: args.profile_pic ?? "",
        default_class: args.default_class ?? undefined,
        created_on: args.created_on,
        updated_on: args.updated_on ?? 0,
        last_login: args.last_login ?? 0,
        status: args.status,
      });
      return studentId;
    }
  });