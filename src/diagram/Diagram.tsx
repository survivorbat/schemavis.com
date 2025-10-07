import Enum from "./Enum";
import Record from "./Record";
import { Schema } from "../models/schema";;

interface DiagramProps {
  schema: Schema | null;
}

function Diagram({ schema }: DiagramProps) {
  if (!schema) {
    return <></>
  }

  return <div className="d-flex flex-wrap justify-content-around">
    {schema.enums().map((enumSchema) => <Enum key={enumSchema.name} schema={enumSchema}></Enum>)}
    {schema.records().map((recordSchema) => <Record key={recordSchema.name} schema={recordSchema}></Record>)}
  </div>
}

export default Diagram;
