import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { type Location } from "~/actions/schemas";

export function LocationTable({ locations }: { locations: Location[] }) {
  return (
<>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Prefecture</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Postal Code</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Building</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {locations.map((location) => (
            <TableRow key={location._id}>
              <TableCell>{location.name}</TableCell>
              <TableCell>{location.phone}</TableCell>
              <TableCell>{location.prefecture}</TableCell>
              <TableCell>{location.city}</TableCell>
              <TableCell>{location.address}</TableCell>
              <TableCell>{location.building}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}