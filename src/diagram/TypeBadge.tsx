import React, { JSX } from "react";
import { SchemaType, TypeName } from "../models/Schema";

interface TypeBadgeProps {
  schemaType: SchemaType;
  typeName: TypeName;
}

const determineBadge = (schemaType: SchemaType, typeName: TypeName): JSX.Element => {
  if (Array.isArray(schemaType)) {
    return <span>
      {schemaType.map((subType, index) => <div key={index}>{determineBadge(subType, Array.isArray(typeName) ? typeName[index] : typeName)}<br /></div>)
      }
    </span >
  }

  switch (schemaType) {
    case "record":
      return <span className="badge bg-primary">{typeName}</span>
    case "enum":
      return <span className="badge bg-success">{typeName}</span>
    default:
      return <span>{typeName}</span>
  }
}

function TypeBadge({ schemaType, typeName }: TypeBadgeProps): JSX.Element {
  return determineBadge(schemaType, typeName);
}


export default TypeBadge;
