import { query, QueryCtx } from "../_generated/server";
import { v } from "convex/values";

export const getUsersByRole = query({
  args: {role: v.union(v.literal("teacher"), v.literal("admin"))},
  handler: async (ctx, args) => {
    const users = await ctx.db.query("staff").collect();
    return users.filter((user) => user.role?.includes(args.role));
  }
});

export const getStaffByUserId = query({
  args: { id: v.id("user") },
  handler: async (ctx, args) => {
    const staff = await ctx.db
    .query("staff")
    .withIndex("user_id", (q) => q.eq("user_id", args.id))
    .first();
    
    return staff ?? null;
  }
})

type UserFields = {
  first_name: string;
  last_name: string;
  email: string;
  postal_code: string;
  prefecture: string;
  city: string;
  address: string;
  status: "active" | "inactive";
};

export const getStaffWithUserData = query(async (ctx) => {
  const staff = await ctx.db
    .query("staff")
    .collect();

  const userIds = staff.map(staff => staff.user_id);

  const users = await ctx.db
    .query("user")
    .filter(q => q.or(...userIds.map(id => q.eq(q.field("_id"), id))))
    .collect();

  return staff.map((staff) => {
    const userData = users.find((user) => user._id === staff.user_id);
    
    if (!userData) {
      throw new Error("No user found for staff member with specified user Id");
    }

    const filteredUserData: UserFields =
    {
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      postal_code: userData.postal_code ?? "",
      prefecture: userData.prefecture ?? "",
      city: userData.city ?? "",
      address: userData.address ?? "",
      status: userData.status ?? "active",
    };

    return {
      ...staff,
      userData: filteredUserData
    };
  })
});

// Takes a user_id and checks if user is staff and has proper auth level
export const isAuthorized = query({
  args: { 
    id: v.id("user"),
    min_role: v.string()
  },
  handler: async (ctx, args) => {
    
  }
})

export const getStaffUsers = query({
  args: {},
  handler: async (ctx) => {
    const staffUsers = await ctx.db.query("staff").collect();
    return staffUsers;
  }
});

export const getUserRoles = query({
  args: { id: v.id("staff") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.id);

    return user?.role;
  }
})
