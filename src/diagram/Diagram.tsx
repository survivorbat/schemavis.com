import Enum from "./Enum";
import Record from "./Record";
import { EnumSchema } from "../models/EnumSchema";
import { Schema } from "../models/Schema";
import { RecordSchema } from "../models/RecordSchema";
;

interface DiagramProps {
  schema: Schema | null;
}


function Diagram({ schema }: DiagramProps) {
  if (!schema) {
    return <></>
  }

  let layers = [];

  const records = schema.records();
  const enums = schema.enums();

  for (let layer = 0; ; layer++) {
    const layerRecords = records.filter((recordSchema: RecordSchema) => recordSchema.depth === layer);
    const layerEnums = enums.filter((enumSchema: EnumSchema) => enumSchema.depth === layer);

    if (layerRecords.length === 0 && layerEnums.length === 0) {
      break;
    }

    layers.push(
      <div key={layer}>
        <div className="d-flex flex-wrap justify-content-around">
          {layerRecords.map((recordSchema, index) => <Record key={index} schema={recordSchema}></Record>)}
          {layerEnums.map((enumSchema, index) => <Enum key={index} schema={enumSchema}></Enum>)}
        </div>
        <hr />
      </div>
    )
  }

  return <div>
    {layers}
  </div>;
}

export default Diagram;
