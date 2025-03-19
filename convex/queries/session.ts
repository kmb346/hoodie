import { query } from "../_generated/server";
import { v } from "convex/values";

export const getSessionById = query({
  args: { sessionId: v.string() },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("session")
      .withIndex("sessionId", (q) => q.eq("sessionId", args.sessionId))
      .first();
    return {
      userId: session?.userId,
      role: session?.role,
    };
  }
});