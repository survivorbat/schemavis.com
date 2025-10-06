import Enum from "./Enum";
import Record from "./Record";
import { parseSchema } from "./schema";
import "./Diagram.css";

interface DiagramProps {
  schema: any;
}

function Diagram({ schema }: DiagramProps) {
  if (!schema) {
    return <></>
  }

  const parsedSchema = parseSchema(schema, "");

  return <div className="diagram-container">
    {parsedSchema.enums().map((enumSchema) => <Enum schema={enumSchema}></Enum>)}
    {parsedSchema.records().map((recordSchema) => <Record schema={recordSchema}></Record>)}
  </div>
}

export default Diagram;
