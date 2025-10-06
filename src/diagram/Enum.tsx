import { EnumSchema } from "./schema";

interface EnumProps {
  schema: EnumSchema;
}

function Enum({ schema }: EnumProps) {
  return <div className="card">
    <div className="card-header bg-success text-white">Enum</div>
    <div className="card-body">
      <h5 className="card-title">{schema.name}</h5>
      <h6 className="card-subtitlle mb-2 text-muted">{schema.namespace}</h6>
      <ul className="list-group list-group-flush">
        {schema.symbols.map((option) => <li className="list-group-item">{option}</li>)}
      </ul>
    </div>
  </div >
}

export default Enum
