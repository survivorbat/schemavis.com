import { EnumSchema } from "./EnumSchema";
import { Schema, SchemaType, TypeName } from "./Schema";

export class RecordSchema implements Schema {
  constructor(readonly depth: number, readonly name: string, readonly namespace: string | undefined, readonly fields: RecordField[]) { }

  records(): RecordSchema[] {
    return [this, ...this.fields.flatMap((field) => field.type.records())];
  }

  enums(): EnumSchema[] {
    return this.fields.flatMap((field) => field.type.enums());
  }

  typeName(): TypeName {
    return this.name;
  }

  schemaType(): SchemaType {
    return "record";
  }
}

export class RecordField {
  readonly defaultValue: string;

  constructor(readonly name: string, readonly type: Schema, defaultValue: any) {
    if (typeof defaultValue === "object") {
      this.defaultValue = JSON.stringify(defaultValue)
      return
    }

    this.defaultValue = String(defaultValue)
  }
}

