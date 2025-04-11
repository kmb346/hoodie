import { internalMutation, mutation } from "../_generated/server";
import { v } from "convex/values";

export const createClassCredit = mutation({
  args: {
    student_id: v.id("student"),
    session_id: v.id("class_session"),
    amount: v.number(),
    created_date: v.number(), // Assuming DateTime is a timestamp
    expiry_date: v.optional(v.number()), // Assuming DateTime is a timestamp
    used_date: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const creditId = await ctx.db.insert("class_credit", {
      student_id: args.student_id,
      session_id: args.session_id, 
      amount: args.amount,
      created_date: args.created_date,
      expiry_date: args.expiry_date ?? 0,
      used_date: args.used_date ?? 0,
    });
    return creditId;
  }
});
