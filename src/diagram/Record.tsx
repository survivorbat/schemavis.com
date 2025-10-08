import React, { JSX } from "react";
import { RecordField, RecordSchema } from "../models/RecordSchema";
import TypeBadge from "./TypeBadge";

interface RecordProps {
  schema: RecordSchema;
}

function Record({ schema }: RecordProps): JSX.Element {
  return <div className="card text-center mb-5" style={{ "minWidth": "20em" }}>
    <div className="card-header bg-primary text-white fw-bold">Record</div>
    <div className="card-body">
      <h5 className="card-title">{schema.name}</h5>
      <h6 className="card-subtitle mb-2 text-muted">{schema.namespace}</h6>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Field</th>
            <th scope="col">Default</th>
            <th scope="col">Type</th>
          </tr>
        </thead>
        <tbody>
          {schema.fields.map((field: RecordField) =>
            <tr key={field.name}>
              <td>{field.name}</td>
              <td>{field.defaultValue}</td>
              <td>
                <TypeBadge typeName={field.type.typeName()} schemaType={field.type.schemaType()}></TypeBadge>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div >
}

export default Record
