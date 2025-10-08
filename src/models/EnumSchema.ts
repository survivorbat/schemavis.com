import { RecordSchema } from "./RecordSchema";
import { Schema, TypeName, SchemaType } from "./Schema";

export class EnumSchema implements Schema {
  constructor(readonly depth: number, readonly name: string, readonly namespace: string | undefined, readonly symbols: string[]) { }

  records(): RecordSchema[] {
    return [];
  }

  enums(): EnumSchema[] {
    return [this];
  }

  typeName(): TypeName {
    return this.name;
  }

  schemaType(): SchemaType {
    return "enum";
  }
}

