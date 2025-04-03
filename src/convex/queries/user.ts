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

export const getUsersByRole = query({
  args: {role: v.union(v.literal("user"), v.literal("teacher"), v.literal("admin"))},
  handler: async (ctx, args) => {
    const users = await ctx.db.query("user").collect();
    return users.filter((user) => user.role.includes(args.role));
  }
});

export const getStaffUsers = query({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("user").collect();
    return users
      .filter(user => user.role.some(role => ["admin", "teacher"].includes(role)))
      .map(user => ({
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
        postal_code: user.postal_code ?? "",
        prefecture: user.prefecture ?? "",
        city: user.city ?? "",
        address: user.address ?? "",
        status: user.status
      }));
  }
});

export const getUserRoles = query({
  args: { id: v.id("user") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.id);

    return user?.role;
  }
})

