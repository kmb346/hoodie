import { Student } from "../schemas";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { api } from "~/convex/_generated/api";

export async function createStudent(data: Student) {

  const user = await fetchMutation(api.mutations.student.createStudent, {
    first_name: data.first_name,
    last_name: data.last_name,
    grade: data.grade,
    default_class: data.default_class ?? undefined,
    status: "active",
    last_login: Date.now(),
    password: "",
    user_id: data.user_id,
    created_on: Date.now(),
    updated_on: Date.now(),
  });

  return user;
}