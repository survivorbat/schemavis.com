import { EnumSchema } from "./EnumSchema";
import { RecordSchema } from "./RecordSchema";
import { Schema, TypeName, SchemaType } from "./Schema";

export class UnionSchema implements Schema {
  constructor(readonly types: Schema[]) { }

  records(): RecordSchema[] {
    return this.types.flatMap((type) => type.records());
  }

  enums(): EnumSchema[] {
    return this.types.flatMap((type) => type.enums());
  }

  typeName(): TypeName {
    return this.types.map((type): TypeName => type.typeName());
  }

  schemaType(): SchemaType {
    return this.types.map((type): SchemaType => type.schemaType());
  }
}

