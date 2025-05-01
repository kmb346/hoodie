import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const createUser = mutation ({
  args: {
    password: v.string(),
    first_name: v.string(),
    last_name: v.string(),
    email: v.string(),
    status: v.optional(v.union(v.literal("active"), v.literal("inactive"))),
    pwSalt: v.string(),
    createdAt: v.number(),
    last_login: v.number(),
    emailVerified: v.optional(v.number()),
    profile_pic: v.optional(v.string()),
    updatedAt: v.number(),
    postal_code: v.optional(v.string()),
    prefecture: v.optional(v.string()),
    city: v.optional(v.string()),
    address: v.optional(v.string()),
  },
  handler: async (ctx, args) => {

    const userId = await ctx.db.insert(
      "user",  
      {
        password: args.password,
        first_name: args.first_name,
        last_name: args.last_name,
        email: args.email,
        status: args.status ?? "active",
        pwSalt: args.pwSalt,
        createdAt: args.createdAt,
        profile_pic: "",
        updatedAt: args.updatedAt,
        last_login: args.last_login,
        postal_code: args.postal_code ?? "",
        city: args.city ?? "",
        prefecture: args.prefecture ?? "",
        address: args.address ?? "",
      })
    
    return userId;
  }
});
