import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { type AdminUser } from "~/actions/schemas";
import { useTranslations } from "next-intl";

export function StaffTable({ users }: { users: AdminUser[] }) {
  
  const t = useTranslations("dashboard.admin.staff");

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("first_name")}</TableHead>
            <TableHead>{t("last_name")}</TableHead>
            <TableHead>{t("email")}</TableHead>
            <TableHead>{t("roles")}</TableHead>
            <TableHead>{t("status")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.user_id}>
              <TableCell>{user.userData.first_name}</TableCell>
              <TableCell>{user.userData.last_name}</TableCell>
              <TableCell>{user.userData.email}</TableCell>
              <TableCell>{user.role.join(", ")}</TableCell>
              <TableCell>{user.userData.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}