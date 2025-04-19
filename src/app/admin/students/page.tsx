import { type Student, type ClassSchema } from "~/actions/schemas";
import { StudentTable } from "./_components/studentTable";
import { NewStudentDialog } from "./_components/newStudentDialog";
import { fetchQuery } from "convex/nextjs";
import { api } from "~/convex/_generated/api";

export default async function Page() {
  
  const [classes, students] = await Promise.all([
    fetchQuery(api.queries.class.getClassKV),
    fetchQuery(api.queries.student.getAllStudents)
  ]);
 
  return ( 
    <div>
      <NewStudentDialog classes={classes} />
      {Array.isArray(students) ? (
        <StudentTable students={students as Student[]} classes={classes as Record<string, string>[]} />
      ) : (
        <div>Error: {students}</div>
      )}
    </div>
  )
}