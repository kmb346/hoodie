import { ClassTable } from "./_components/classTable";
import { NewClassDialog } from "./_components/newClassDialog";
import { fetchQuery } from "convex/nextjs";
import { api } from "~/convex/_generated/api";

export default async function Page() {
  const classes = await fetchQuery(api.queries.class.getAllClasses);
  
  return ( 
    <div>
      <NewClassDialog />
      {Array.isArray(classes) ? (
        <ClassTable classes={classes} />
      ) : (
        <div>Error: {classes}</div>
      )}
    </div>
  )
}