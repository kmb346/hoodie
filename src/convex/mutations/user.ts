import { internalMutation, mutation } from "../_generated/server";
import { v } from "convex/values";

export const createUser = mutation ({
  args: {
    password: v.string(),
    first_name: v.string(),
    last_name: v.string(),
    email: v.string(),
    status: v.union(v.literal("active"), v.literal("inactive")),
    role: v.array(v.union(v.literal("user"), v.literal("teacher"), v.literal("admin"))),
    pwSalt: v.string(),
    createdAt: v.number(),
    last_login: v.number(),
    emailVerified: v.optional(v.number()),
    profile_pic: v.optional(v.string()),
    updatedAt: v.number()
  },
  handler: async (ctx, args) => {
    const userId = await ctx.db.insert(
      "user",  
      {
        password: args.password,
        first_name: args.first_name,
        last_name: args.last_name,
        email: args.email,
        role: args.role ?? "user",
        status: args.status ?? "active",
        pwSalt: args.pwSalt,
        createdAt: args.createdAt,
        profile_pic: "",
        updatedAt: args.updatedAt,
        last_login: args.last_login,
      })
    
    return userId;
  }
});
