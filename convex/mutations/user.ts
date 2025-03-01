import "server-only";

import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const createUser = {
  createUser: mutation ({
    args: {
      first_name: v.string(),
      last_name: v.string(),
      username: v.string(),
      status: v.string(),
      pwSalt: v.string(),
      postal_code: v.optional(v.string()),
      prefecture: v.optional(v.string()),
      city: v.optional(v.string()),
      address: v.optional(v.string()),
      craatedAt: v.number(),
      last_login: v.number(),
      emailVerified: v.optional(v.number()),
      profile_pic: v.optional(v.string()),
      password: v.string(),
      updatedAt: v.number()
    },
    handler: async (ctx, args) => {
      const userId = await ctx.db.insert(
        "user", 
        {
          password: args.password,
          first_name: args.first_name,
          last_name: args.last_name,
          username: args.username,
          status: "active",
          pwSalt: "XXXX",
          postal_code: args.postal_code,
          prefecture: args.prefecture,
          city: args.city,
          address: args.address,
          createdAt: 0,
          last_login: 0,
          emailVerified: 0,
          profile_pic: "",
          updatedAt: 0
        })
      
      return userId;
    }
  }),
}