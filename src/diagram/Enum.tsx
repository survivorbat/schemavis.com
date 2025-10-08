import { EnumSchema } from "../models/EnumSchema";

interface EnumProps {
  schema: EnumSchema;
}

function Enum({ schema }: EnumProps) {
  return <div className="card text-center mb-5" style={{ "minWidth": "15em" }} >
    <div className="card-header bg-success text-white fw-bold">Enum</div>
    <div className="card-body">
      <h5 className="card-title">{schema.name}</h5>
      <h6 className="card-subtitle mb-2 text-muted">{schema.namespace}</h6>
      <table className="table">
        <thead>
          <tr>
            <th>Symbol</th>
          </tr>
        </thead>
        <tbody>
          {schema.symbols.map((symbol) => <tr key={symbol}><td>{symbol}</td></tr>)}
        </tbody>
      </table>
    </div>
  </div>
}

export default Enum
