import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { type Student } from "~/actions/schemas";
import { useTranslations } from "next-intl";

export function StudentTable(
  { students, classes }: 
  { students: Student[], classes: Record<string, string>[] }
) {
  const t = useTranslations("dashboard.admin.student");

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('first_name')}</TableHead>
            <TableHead>{t('last_name')}</TableHead>
            <TableHead>{t('grade')}</TableHead>
            <TableHead>{t('class')}</TableHead>
            <TableHead>{t('status')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student._id}>
              <TableCell>{student.first_name}</TableCell>
              <TableCell>{student.last_name}</TableCell>
              <TableCell>{student.grade}</TableCell>
              <TableCell>{classes.find((c) => c.id === student.default_class)?.name ?? "N/A"}</TableCell>
              <TableCell>{student.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}