import { RecordField, RecordSchema } from "./schema"

interface RecordProps {
  schema: RecordSchema;
}

function Record({ schema }: RecordProps) {
  return <div className="card">
    <div className="card-header bg-primary text-white">Record</div>
    <div className="card-body">
      <h5 className="card-title">{schema.name}</h5>
      <h6 className="card-subtitlle mb-2 text-muted">{schema.namespace}</h6>
      <ul className="list-group list-group-flush">
        {schema.fields.map((field: RecordField) =>
          <li className="list-group-item d-flex justify-content-between">
            <div>{field.name}</div>
            <div>{field.type.typeName()}</div>
          </li>
        )}
      </ul>
    </div>
  </div >
}

export default Record
