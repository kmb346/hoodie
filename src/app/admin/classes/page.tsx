import { ClassTable } from "./_components/classTable";
import { NewClassDialog } from "./_components/newClassDialog";
import { getAllClasses } from "~/actions/classes/queries";

export default async function Page() {
  const classes = await getAllClasses();
  
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