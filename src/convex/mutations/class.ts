import { internalMutation, mutation } from "../_generated/server";
import { v } from "convex/values";

export const createClass = mutation({
  args: {
    name: v.string(),
    teacher_id: v.optional(v.id("staff")),
    def_day: v.optional(v.string()),
    def_time: v.optional(v.number()),
    def_room_id: v.optional(v.id("room")),
    student_limit: v.number(),
  },
  handler: async (ctx, args) => {
    const classId = await ctx.db.insert("class", {
      name: args.name,
      teacher_id: args.teacher_id ?? undefined,
      def_day: args.def_day ?? "",
      def_time: args.def_time ?? 0,
      def_room_id: args.def_room_id ?? undefined,
      student_limit: args.student_limit,
    });
    return classId;
  }
});
