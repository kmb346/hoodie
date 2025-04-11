import { internalMutation, mutation } from "../_generated/server";
import { v } from "convex/values";

export const createClassRecord = mutation({
  args: {
    session_id: v.id("class_session"),
    student_id: v.id("student"),
    attended: v.boolean(),
    early_late: v.optional(v.number()),
    assignment: v.optional(v.boolean()),
    assigment_score: v.optional(v.number()),
    note: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const recordId = await ctx.db
      .insert("class_record", {
        session_id: args.session_id,
        student_id: args.student_id,
        attended: args.attended,
        early_late: args.early_late ?? 0,
        assignment: args.assignment ?? false,
        assigment_score: args.assigment_score ?? 0,
        note: args.note ?? "",
    });
    return recordId;
  }
});
