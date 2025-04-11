import { ClassTable } from "./_components/classTable";
import { getAllClasses } from "~/actions/classes/queries";

export default async function Page() {
  const classes = await getAllClasses();
  
  return ( 
    <div>
      {Array.isArray(classes) ? (
        <ClassTable classes={classes} />
      ) : (
        <div>Error: {classes}</div>
      )}
    </div>
  )
}