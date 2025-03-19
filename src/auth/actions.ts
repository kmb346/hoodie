"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { signInSchema, signUpSchema } from "./schemas";
import { fetchQuery, fetchMutation } from "convex/nextjs";
import { api } from "convex/_generated/api";
import { comparePasswords, generateSalt, hashPassword } from "./core/passwordHasher";
import { cookies } from "next/headers";
import { createUserSession, removeUserSession } from "./core/session";


export async function signIn(formData: signInSchema) {
  const user = await fetchQuery(api.queries.user.getUserByEmail, { email: formData.email });

  if (user == null || user.password == null || user.pwSalt == null) {
    return "Unable to sign in.";
  };
  
  const passwordsMatch = await comparePasswords({
    userPassword: user.password,
    unhashedPassword: formData.password,
    salt: user.pwSalt
  });

  if (!passwordsMatch) return "Unable to sign in.";

  await createUserSession({ userId: user._id, role: ["user"] }, await cookies());

  redirect("/");
}

export async function signUp(formData: signUpSchema) {
  
  const existingUser = await fetchQuery(api.queries.user.getUserByEmail, { email: formData.email });
  console.log("Existing User :" + existingUser);

  if (existingUser != null) return "Account already exists with this email.";

  try {
    const salt = generateSalt();
    const pwd = await hashPassword(formData.password, salt);

    const user = await fetchMutation(api.mutations.user.createUser,
      { 
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        password: pwd,
        pwSalt: salt,
        role: ["user"],
        status: "active",
        createdAt: Date.now(),
        updatedAt: Date.now(),
        last_login: Date.now(),
      }
    );

    if (user == null) return "Unable to create account.";
    await createUserSession({ userId: user, role: ["user"] }, await cookies());
  } catch {
    return "Unable to create account.";
  }

  redirect("/");
}

export async function signOut() {
  await removeUserSession(await cookies());
  redirect("/");
}
