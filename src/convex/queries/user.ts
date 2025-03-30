import { query } from "../_generated/server";
import { v } from "convex/values";

export const getUserById = query({
  args: { id: v.id("user") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.id);
    return user;
  }
})

export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("user")
      .withIndex("email", (q) => q.eq("email", args.email))
      .first();

    return user ? {
      _id: user?._id,
      roles: user?.role,
      password: user?.password,
      pwSalt: user?.pwSalt
    } : null;
  }
});

export const getUserRoles = query({
  args: { id: v.id("user") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.id);

    return user?.role;
  }
})

