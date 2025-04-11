import { internalMutation, mutation } from "../_generated/server";
import { v } from "convex/values";

export const createClassSession = mutation({
  args: {
    class_id: v.id("class"),
    class_date: v.number(),
    start_time: v.number(),
    duration: v.number(),
    room_id: v.optional(v.id("room")),
    staff_id: v.id("staff"),
  },
  handler: async (ctx, args) => {
    const classSessionId = await ctx.db.insert("class_session", {
      class_id: args.class_id,
      class_date: args.class_date,
      start_time: args.start_time,
      duration: args.duration,
      room_id: args.room_id ?? undefined,
      staff_id: args.staff_id,
    });
    return classSessionId;
  },
});
