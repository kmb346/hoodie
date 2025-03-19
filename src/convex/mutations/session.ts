import { internalMutation, mutation } from "../_generated/server";
import { v } from "convex/values";

export const createSession = mutation({
  args: {
    sessionId: v.string(), 
    userId: v.id("user"),
    role: v.array(v.union(v.literal("user"), v.literal("teacher"), v.literal("admin"))),
    expiresAt: v.number()
  },
  handler: async (ctx, args) => {
    const sessionId = await ctx.db.insert(
      "session", 
      { 
        userId: args.userId,
        role: args.role,
        sessionId: args.sessionId,
        expiresAt: args.expiresAt,
      })

    return sessionId;
  }
});

export const deleteSessionById = mutation({
  args: { sessionId: v.id("session") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.sessionId);
  }
});

export const deleteSessionBySessionId = mutation({
  args: { sessionId: v.string() },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("session")
      .withIndex("sessionId", (q) => q.eq("sessionId", args.sessionId))
      .unique();

    if (!session) {
      console.warn("Session not found");
      return;
    }

    await ctx.db.delete(session._id);
    console.log("Session with ID " + session._id + " deleted from DB");
  }
});

export const deleteExpiredSessions = internalMutation({
  args: { now: v.number() },
  handler: async (ctx, args) => {
    const now = args.now;
    const expiredTokens = await ctx.db
      .query("session")
      .filter((q) => q.lt(q.field("expiresAt"), now))
      .collect();
    
    for (const token of expiredTokens) {
      await ctx.db.delete(token._id);
    }
  }
});