import { query } from "../_generated/server";
import { v } from "convex/values";


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

