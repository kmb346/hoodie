import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { type ClassSchema } from "~/actions/schemas";
import { useTranslations } from "next-intl";

export function ClassTable({ classes }: { classes: ClassSchema[] }) {

  const t = useTranslations("dashboard.admin.class");

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("class_name")}</TableHead>
            <TableHead>{t("day")}</TableHead>
            <TableHead>{t("time")}</TableHead>
            <TableHead>{t("teacher")}</TableHead>
            <TableHead>{t("student_limit")}</TableHead>
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