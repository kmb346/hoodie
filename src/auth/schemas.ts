import { z } from "zod";
import { Infer, v } from "convex/values";
import { brandedString } from "convex-helpers/validators";

const emailValidator = brandedString("email");
const stringValidator = v.string();

export type signInSchema = {
  email: Infer<typeof emailValidator>,
  password: Infer<typeof stringValidator>,
};

export type signUpSchema = { 
  first_name: Infer<typeof stringValidator>,
  last_name: Infer<typeof stringValidator>,
  email: Infer<typeof emailValidator>,
  password: Infer<typeof stringValidator>,
};