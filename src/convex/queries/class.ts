import { query } from "../_generated/server";
import { v } from "convex/values";

export const getClassById = query({
  args: { id: v.id("class") },
  handler: async (ctx, args) => {
    const className = await ctx.db.get(args.id);
    return className;
  }
})

export const getAllClasses = query({
  args: {},
  handler: async (ctx, args) => {
    const classes = await ctx.db.query("class").collect();
    return classes;
  }
});