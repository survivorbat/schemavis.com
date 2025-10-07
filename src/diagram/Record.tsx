import { RecordField, RecordSchema } from "../models/schema"

interface RecordProps {
  schema: RecordSchema;
}

function Record({ schema }: RecordProps) {
  return <div className="card text-center mb-5" style={{ "minWidth": "20em" }}>
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
          {schema.fields.map((field: RecordField) => {
            let fieldClasses = ""

            switch (field.type.schemaType()) {
              case "record":
                fieldClasses = "badge bg-primary"
                break;
              case "enum":
                fieldClasses = "badge bg-success"
                break;
            }

            return (
              <tr key={field.name}>
                <td>{field.name}</td>
                <td>
                  <span className={fieldClasses}>{field.type.typeName()}</span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  </div >
}

export default Record
