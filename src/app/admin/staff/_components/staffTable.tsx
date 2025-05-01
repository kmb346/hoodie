import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { type AdminUser } from "~/actions/schemas";

export function StaffTable({ users }: { users: AdminUser[] }) {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Roles</TableHead>
            <TableHead>Status</TableHead>
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