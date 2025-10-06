import { EnumSchema } from "./schema";

interface EnumProps {
  schema: EnumSchema;
}

function Enum({ schema }: EnumProps) {
  return <div className="diagram-item diagram-enum">
    <div className="diagram-item-title diagram-enum-title">{schema.name}</div>
    <div className="diagram-item-subtitle diagram-enum-subtitle">{schema.namespace}</div>
    <div className="diagram-item-body">
      {schema.symbols.map((option) => <div className="diagram-enum-symbol">{option}</div>)}
    </div>
  </div>
}

export default Enum
