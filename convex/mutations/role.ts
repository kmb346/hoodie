import "server-only";

import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const createRole = mutation({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    const roleId = await ctx.db.insert("role", { name: args.name })

    return roleId;
  }
})