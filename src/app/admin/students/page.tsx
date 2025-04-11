import { Student } from "~/actions/schemas";
import { StudentTable } from "./_components/studentTable";
import { getAllStudents } from "~/actions/student/queries";

export default async function Page() {
  
  const students = await getAllStudents();
  
  return ( 
    <div>
      {Array.isArray(students) ? (
        <StudentTable students={students as Student[]} />
      ) : (
        <div>Error: {students}</div>
      )}
    </div>
  )
}