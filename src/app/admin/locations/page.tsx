import { Location } from "~/actions/schemas";
import { LocationTable } from "./_components/locationTable";
import { NewLocationDialog } from "./_components/newLocationDialog";
import { fetchQuery } from "convex/nextjs";
import { api } from "~/convex/_generated/api";

export default async function Page() {
  
  const locations = await fetchQuery(api.queries.location.getAllLocations);
  
  return ( 
    <div className="mx-14">
      <NewLocationDialog />
      {Array.isArray(locations) ? (
        <>
          <LocationTable locations={locations as Location[]} />
        </>
      ) : (
        <div>Error: {locations}</div>
      )}
    </div>
  )
}