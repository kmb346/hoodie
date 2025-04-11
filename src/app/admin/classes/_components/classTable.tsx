import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { type ClassSchema } from "~/actions/schemas";

export function ClassTable({ classes }: { classes: ClassSchema[] }) {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Day</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Teacher</TableHead>
            <TableHead>Student Limit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {classes.map((c) => (
            <TableRow key={c._id}>
              <TableCell>{c.name}</TableCell>
              <TableCell>{c.def_day}</TableCell>
              <TableCell>{c.def_time}</TableCell>
              <TableCell>{c.teacher_id}</TableCell>
              <TableCell>{c.student_limit}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}