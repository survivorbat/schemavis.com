import { RecordField, RecordSchema } from "../models/schema"

interface RecordProps {
  schema: RecordSchema;
}

function Record({ schema }: RecordProps) {
  return <div className="card text-center" style={{ "minWidth": "20em" }}>
    <div className="card-header bg-primary text-white fw-bold">Record</div>
    <div className="card-body">
      <h5 className="card-title">{schema.name}</h5>
      <h6 className="card-subtitle mb-2 text-muted">{schema.namespace}</h6>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Field</th>
            <th scope="col">Type</th>
          </tr>
        </thead>
        <tbody>
          {schema.fields.map((field: RecordField) => <tr key={field.name}><td>{field.name}</td><td>{field.type.typeName()}</td></tr>)}
        </tbody>
      </table>
    </div>
  </div >
}

export default Record
