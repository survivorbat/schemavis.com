import { EnumSchema } from "./EnumSchema";
import { RecordSchema } from "./RecordSchema";
import { Schema, TypeName, SchemaType } from "./Schema";

export class ArraySchema implements Schema {
  constructor(readonly items: Schema) { }

  records(): RecordSchema[] {
    return this.items.records();
  }

  enums(): EnumSchema[] {
    return this.items.enums();
  }

  typeName(): TypeName {
    return `${this.items.typeName()}[]`;
  }

  schemaType(): SchemaType {
    return this.items.schemaType();
  }
}

