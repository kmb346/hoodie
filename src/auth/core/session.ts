import crypto from "crypto";

import { fetchMutation, fetchQuery } from "convex/nextjs";
import { api } from "~/convex/_generated/api";
import { type Id } from "~/convex/_generated/dataModel";
import { type Infer, v } from "convex/values";

// Seven days in seconds
const SESSION_EXPIRATION_SECONDS = 60 * 60 * 24 * 7;
const COOKIE_SESSION_KEY = "session-id";
const roles = v.union(v.literal("user"), v.literal("teacher"), v.literal("admin"));

type UserSession = {
  userId: Id<"user">;
  role: Infer<typeof roles>;
}

export type Cookies = {
  set: (
    key: string,
    value: string,
    options: {
      secure?: boolean
      httpOnly?: boolean
      sameSite?: "strict" | "lax"
      expires?: number

    }
  ) => void
  get: (key: string) => { name: string; value: string } | undefined;
  delete: (key: string) => void;
}

export async function createUserSession(
  user: UserSession, 
  cookies: Cookies
) {
  const bcrypt = require("bcryptjs");

  const sessionId = await bcrypt.genSalt(10) as string;
  
  await fetchMutation(api.mutations.session.createSession, ({ 
    sessionId: sessionId, 
    userId: user.userId,
    role: user.role, 
    expiresAt: Date.now() + SESSION_EXPIRATION_SECONDS * 1000 
  }));

  setCookie(sessionId, cookies);
}

function setCookie(sessionId: string, cookies: Pick<Cookies, "set">) {
  cookies.set(COOKIE_SESSION_KEY, sessionId, {
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    expires: Date.now() + SESSION_EXPIRATION_SECONDS * 1000,
  });
}

export function getUserFromSession(cookies: Pick<Cookies, "get">) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (sessionId == null) return null;

  return getUserSessionById(sessionId);
}

async function getUserSessionById(sessionId: string) {
  const user = await fetchQuery(api.queries.session.getSessionById, { sessionId: sessionId});
  
  return user ?? user;
}

export async function updateUserSessionData(
  user: UserSession, 
  cookies: Pick<Cookies, "get">
) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (sessionId == null) return null;

  await fetchMutation(
    api.mutations.session.updateSessionRole, 
    {sessionId: sessionId, role: user.role, expires: Date.now() + SESSION_EXPIRATION_SECONDS * 1000 }
  );
}

export async function removeUserSession(cookies: Pick<Cookies, "get" | "delete">) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (sessionId == null) return null;

  await fetchMutation(api.mutations.session.deleteSessionBySessionId, {sessionId: sessionId});
  cookies.delete(COOKIE_SESSION_KEY);

}


