import { RecordField, RecordSchema } from "./schema"

interface RecordProps {
  schema: RecordSchema;
}

function Record({ schema }: RecordProps) {
  return <div className="diagram-item diagram-record">
    <div className="diagram-item-title diagram-record-title">{schema.name}</div>
    <div className="diagram-item-subtitle diagram-record-subtitle">{schema.namespace}</div>
    <div className="diagram-item-body">
      {schema.fields.map((field: RecordField) =>
        <div className="diagram-record-row">
          <span className="diagram-record-key">{field.name}</span>
          <span className="diagram-record-value">{field.type.typeName()}</span>
        </div>
      )}
    </div>
  </div>
}

export default Record
