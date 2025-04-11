import { query } from "../_generated/server";
import { v } from "convex/values";

export const getStudentById = query({
  args: { id: v.id("student") },
  handler: async (ctx, args) => {
    const student = await ctx.db.get(args.id);
    return student;
  }
})

export const getAllStudents = query({
  args: {},
  handler: async (ctx, args) => {
    const students = await ctx.db.query("student").collect();
    return students;
  }
});


