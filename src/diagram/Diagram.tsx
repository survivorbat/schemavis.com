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
    {schema.records().map((recordSchema, index) => <Record key={index} schema={recordSchema}></Record>)}
    {schema.enums().map((enumSchema, index) => <Enum key={index} schema={enumSchema}></Enum>)}
  </div>
}

export default Diagram;
