import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { type Location } from "~/actions/schemas";
import { useTranslations } from "next-intl";

export function LocationTable({ locations }: { locations: Location[] }) {
  const t = useTranslations("dashboard.admin.location");
  
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("location_name")}</TableHead>
            <TableHead>{t("phone")}</TableHead>
            <TableHead>{t("prefecture")}</TableHead>
            <TableHead>{t("city")}</TableHead>
            <TableHead>{t("postal_code")}</TableHead>
            <TableHead>{t("address")}</TableHead>
            <TableHead>{t("building")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {locations.map((location) => (
            <TableRow key={location._id}>
              <TableCell>{location.name}</TableCell>
              <TableCell>{location.phone}</TableCell>
              <TableCell>{location.prefecture}</TableCell>
              <TableCell>{location.city}</TableCell>
              <TableCell>{location.postal_code}</TableCell>
              <TableCell>{location.address}</TableCell>
              <TableCell>{location.building}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}