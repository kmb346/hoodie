import { internalMutation, mutation } from "../_generated/server";
import { v } from "convex/values";

export const createRoom = mutation({
  args: {
    name: v.string(),
    location_name: v.id("location"),
    type: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const roomId = await ctx.db.insert("room", {
      name: args.name,
      location_name: args.location_name,
      type: args.type ?? "",
    });
    return roomId;
  },
});
