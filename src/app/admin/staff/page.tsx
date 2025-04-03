import { StaffTable } from "~/app/admin/_components/staffTable";
import { getAllStaff } from "~/actions/staff/getStaff";

export default async function Page() {
  const staff = await getAllStaff();
  
  return ( 
    <div>
      {Array.isArray(staff) ? (
        <StaffTable users={staff} />
      ) : (
        <div>Error: {staff}</div>
      )}
    </div>
  )
}