import { StaffTable } from "~/app/admin/_components/staffTable";
import { NewStaffDialog } from "./_components/newStaffDialog";
import { getAllStaff } from "~/actions/staff/queries";

export default async function Page() {
  const staff = await getAllStaff();
  
  return ( 
    <div>
      <NewStaffDialog />
      {Array.isArray(staff) ? (
        <StaffTable users={staff} />
      ) : (
        <div>Error: {staff}</div>
      )}
    </div>
  )
}