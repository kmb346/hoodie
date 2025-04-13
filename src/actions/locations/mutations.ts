import { Location } from "../schemas";
import { fetchMutation } from "convex/nextjs";
import { api } from "~/convex/_generated/api";

export async function createLocation(data: Location) {

  const location = await fetchMutation(api.mutations.location.createLocation, {
    name: data.name,
    postal_code: data.postal_code,
    prefecture: data.prefecture,
    city: data.city,
    address: data.address,
    building: data.building,
    phone: data.phone,
  });

  return location;
}