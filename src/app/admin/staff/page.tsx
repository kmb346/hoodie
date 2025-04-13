import { StaffTable } from "./_components/staffTable";
import { NewStaffDialog } from "./_components/newStaffDialog";
import { getAllStaff } from "~/actions/staff/queries";

export default async function Page() {
  const staff = await getAllStaff();
  
  return ( 
    <div className="mx-14">
      <NewStaffDialog />
      {Array.isArray(staff) ? (
        <StaffTable users={staff} />
      ) : (
        <div>Error: {staff}</div>
      )}
    </div>
  )
}