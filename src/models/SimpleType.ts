import { EnumSchema } from "./EnumSchema";
import { RecordSchema } from "./RecordSchema";
import { Schema, SchemaType, TypeName } from "./Schema";

export class SimpleType implements Schema {
  constructor(readonly type: string | { type: string; logicalType: string; }) { }

  records(): RecordSchema[] {
    return [];
  }

  enums(): EnumSchema[] {
    return [];
  }

  typeName(): TypeName {
    if (typeof this.type === "object") {
      return this.type.logicalType;
    }

    return this.type;
  }

  schemaType(): SchemaType {
    return this.typeName();
  }
}

