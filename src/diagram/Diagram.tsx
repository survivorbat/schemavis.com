import Enum from "./Enum";
import Record from "./Record";
import { parseSchema } from "./schema";

interface DiagramProps {
  schema: any;
}

function Diagram({ schema }: DiagramProps) {
  if (!schema) {
    return <></>
  }

  const parsedSchema = parseSchema(schema, "");

  return <div className="d-flex justify-content-around">
    {parsedSchema.enums().map((enumSchema) => <Enum schema={enumSchema}></Enum>)}
    {parsedSchema.records().map((recordSchema) => <Record schema={recordSchema}></Record>)}
  </div>
}

export default Diagram;
