import { EnumSchema } from "./EnumSchema";
import { RecordSchema } from "./RecordSchema";
import { Schema, TypeName, SchemaType } from "./Schema";


export class MapSchema {
  constructor(readonly values: Schema) { }

  records(): RecordSchema[] {
    return this.values.records();
  }

  enums(): EnumSchema[] {
    return this.values.enums();
  }

  typeName(): TypeName {
    return `map[string]${this.values.typeName()}`;
  }

  schemaType(): SchemaType {
    return this.values.schemaType();
  }
}

