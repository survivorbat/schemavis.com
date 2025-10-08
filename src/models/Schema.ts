import { RecordSchema } from "./RecordSchema";
import { EnumSchema } from "./EnumSchema";

export type SchemaType = string | SchemaType[];
export type TypeName = string | TypeName[];

export interface Schema {
  records(): RecordSchema[];
  enums(): EnumSchema[];
  typeName(): TypeName;
  schemaType(): SchemaType;
}

