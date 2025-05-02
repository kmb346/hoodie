"use server";

import { redirect } from "next/navigation";
import type { signInSchema, signUpSchema } from "./schemas";
import { fetchQuery, fetchMutation } from "convex/nextjs";
import { api } from "~/convex/_generated/api";
import { comparePasswords, generateSalt, hashPassword } from "./core/passwordHasher";
import { cookies } from "next/headers";
import { createUserSession, removeUserSession } from "./core/session";
import { Roles } from "./schemas";


export async function signIn(formData: signInSchema) {
  const user = await fetchQuery(api.queries.user.getUserByEmail, { email: formData.email });
  
  if (user) {
    const staffUser = await fetchQuery(api.queries.staff.getStaffByUserId, {id: user._id});

    if (user?.password == null || user?.pwSalt == null) {
      return "Unable to sign in.";
    };
    
    const passwordsMatch = await comparePasswords({
      userPassword: user.password,
      unhashedPassword: formData.password,
    });
    
    if (!passwordsMatch) return "Unable to sign in.";

    if (staffUser) {
      const getHighestRole = (rolesArray: Roles[]) => {
        if (rolesArray?.includes("admin")) { 
          return "admin"; 
        } else {
          return "teacher";
        }
      };

      const role = getHighestRole(staffUser.role);
      await createUserSession({ userId: user._id, role: role }, await cookies());

      if(role == "admin") {
        redirect("/admin");
      } else { 
        redirect("/");
      }

    }

    await createUserSession({ userId: user._id, role: "user" }, await cookies());
    
    redirect("/");
  
  } else {
    return "User not found.";
  }
}

export async function signUp(formData: signUpSchema) {
  
  const existingUser = await fetchQuery(api.queries.user.getUserByEmail, { email: formData.email });

  if (existingUser != null) return "Account already exists with this email.";

  try {
    const salt = await generateSalt();
    const pwd = await hashPassword(formData.password, salt);

    const date = Date.now();

    const user = await fetchMutation(api.mutations.user.createUser,
      { 
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        password: pwd,
        pwSalt: salt,
        status: "active",
        createdAt: date,
        updatedAt: date,
        last_login: date,
      }
    );
   
    if (user == null) return "Unable to create account.";
    await createUserSession({ userId: user, role: "user" }, await cookies());
  } catch (e) {
    return "Unable to create account.";
  }

  redirect("/");
}

export async function signOut() {
  await removeUserSession(await cookies());
  redirect("/");
}
