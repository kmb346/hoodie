import { internalMutation, mutation } from "../_generated/server";
import { v } from "convex/values";

export const createAssignment = mutation({
  args: {
    name: v.string(),
    session_id: v.id("class_session"),
    created_date: v.number(),
    Due_date: v.optional(v.number()), 
    score: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const assignmentId = await ctx.db.insert("assignment", {
      name: args.name,
      session_id: args.session_id,
      created_date: args.created_date,
      Due_date: args.Due_date,
      score: args.score,
    });
    return assignmentId;
  }
});
