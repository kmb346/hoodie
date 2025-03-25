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
      .collect();

    return user[0];
  }
});

export const getUserRoles = query({
  args: { id: v.id("user") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.id);

    return user?.role;
  }
})

