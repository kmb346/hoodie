import { type Student, type ClassSchema } from "~/actions/schemas";
import { StudentTable } from "./_components/studentTable";
import { NewStudentDialog } from "./_components/newStudentDialog";
import { fetchQuery } from "convex/nextjs";
import { api } from "~/convex/_generated/api";
import { getTranslations } from "next-intl/server";

export default async function Page() {
  
  const [classes, students, t] = await Promise.all([
    fetchQuery(api.queries.class.getClassKV),
    fetchQuery(api.queries.student.getAllStudents),
    getTranslations("dashboard.admin")
  ]);
 
  return ( 
    <div>
      <NewStudentDialog classes={classes} />
      {Array.isArray(students) ? (
        <StudentTable students={students as Student[]} classes={classes as Record<string, string>[]} t={t} />
      ) : (
        <div>Error: {students}</div>
      )}
    </div>
  )
}