import { internalMutation, mutation } from "../_generated/server";
import { v } from "convex/values";

export const createLocation = mutation({
  args: {
    name: v.string(),
    postal_code: v.optional(v.string()),
    prefecture: v.optional(v.string()),
    city: v.optional(v.string()),
    address: v.optional(v.string()),
    building: v.optional(v.string()),
    phone: v.string(),
   },
  handler: async (ctx, args) => {
    const locationId = await ctx.db.insert("location", {
      name: args.name,
      postal_code: args.postal_code ?? "",
      prefecture: args.prefecture ?? "",
      city: args.city ?? "",
      address: args.address ?? "",
      building: args.building ?? "",
      phone: args.phone,
    })
    return locationId;
  }
});