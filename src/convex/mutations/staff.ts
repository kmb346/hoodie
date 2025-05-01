import { internalMutation, mutation } from "../_generated/server";
import { v } from "convex/values";

export const createStaff = mutation ({
  args: { 
    user_id: v.id("user"),
    birthdate: v.optional(v.number()),
    role: v.array(v.union(v.literal("teacher"), v.literal("admin"))),
  },
  handler: async (ctx, args) => {
    const staff_id = await ctx.db.insert(
      "staff",  
      {
        user_id: args.user_id,
        birthdate: args.birthdate ?? 0,
        role: args.role ?? ["teacher"],
      })
    
    return staff_id;
  }
});
