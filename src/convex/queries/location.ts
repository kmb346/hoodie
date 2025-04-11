import { query } from "../_generated/server";
import { v } from "convex/values";

export const getLocationById = query({
  args: { id: v.id("location") },
  handler: async (ctx, args) => {
    const location = await ctx.db.get(args.id);
    return location;
  }
})

export const getAllLocations = query({
  args: {},
  handler: async (ctx, args) => {
    const locations = await ctx.db.query("location").collect();
    return locations;
  }
});


