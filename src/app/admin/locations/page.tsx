import { Location } from "~/actions/schemas";
import { LocationTable } from "./_components/locationTable";
import { getAllLocations } from "~/actions/locations/queries";

export default async function Page() {
  
  const locations = await getAllLocations();
  
  return ( 
    <div>
      {Array.isArray(locations) ? (
        <LocationTable locations={locations as Location[]} />
      ) : (
        <div>Error: {locations}</div>
      )}
    </div>
  )
}