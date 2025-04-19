import { StaffTable } from "./_components/staffTable";
import { NewStaffDialog } from "./_components/newStaffDialog";
import { fetchQuery } from "convex/nextjs";
import { api } from "~/convex/_generated/api";

export default async function Page() {
  const staff = await fetchQuery(api.queries.user.getStaffUsers);
  
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