import { type ClassSchema } from "../schemas";
import { fetchMutation } from "convex/nextjs";
import { api } from "~/convex/_generated/api";

export async function createClass(data: ClassSchema) {

  const location = await fetchMutation(api.mutations.class.createClass, {
    name: data.name,
    def_day: data.def_day ?? "",
    def_time: data.def_time ?? "",
    teacher_id: data.teacher_id ?? undefined,
    student_limit: data.student_limit ?? 0,
  });

  return location;
}