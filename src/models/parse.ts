import { ArraySchema } from "./ArraySchema";
import { EnumSchema } from "./EnumSchema";
import { MapSchema } from "./MapSchema";
import { RecordField, RecordSchema } from "./RecordSchema";
import { Schema } from "./Schema";
import { SimpleType } from "./SimpleType";
import { UnionSchema } from "./UnionSchema";

const primitiveTypes = [
  'null',
  'boolean',
  'int',
  'long',
  'float',
  'double',
  'bytes',
  'string',
] as const;

const logicalTypes = [
  'decimal',
  'uuid',
  'date',
  'time-millis',
  'time-micros',
  'timestamp-millis',
  'timestamp-micros',
  'local-timestamp-millis',
  'local-timestamp-micros',
  'duration',
  'millisecond',
] as const;

const isPrimitiveType = (input: unknown): boolean => {
  return typeof input === 'string' && primitiveTypes.includes(input as any);
}

const isLogicalType = (input: unknown): boolean => {
  return (
    typeof input === 'object' &&
    input !== null &&
    'type' in input &&
    logicalTypes.includes((input as any).logicalType)
  );
}

const isSimpleType = (x: unknown): boolean => {
  return isPrimitiveType(x) || isLogicalType(x)
}

export const parseSchema = (schema: any, depth: number, namespace: string): Schema => {
  switch (schema.type) {
    case 'record':
      const fields = schema.fields.map((field: any): RecordField => {
        if (isSimpleType(field.type)) {
          return new RecordField(field.name, new SimpleType(field.type), field.default || "");
        }

        if (Array.isArray(field.type)) {
          return new RecordField(field.name, parseUnion(field.type, depth + 1, schema.namespace || namespace), field.default || "")
        }

        const subSchema = parseSchema(field.type, depth + 1, schema.namespace || namespace);
        return new RecordField(field.name, subSchema, field.default || "");
      });

      return new RecordSchema(depth, schema.name, schema.namespace || namespace, fields);

    case 'array':
      if (isSimpleType(schema.items)) {
        return new ArraySchema(new SimpleType(schema.items));
      }

      if (Array.isArray(schema.items)) {
        return new ArraySchema(parseUnion(schema.items, depth, namespace));
      }

      return new ArraySchema(parseSchema(schema.items, depth, namespace));

    case 'map':
      if (isSimpleType(schema.values)) {
        return new MapSchema(new SimpleType(schema.values));
      }

      if (Array.isArray(schema.values)) {
        return new MapSchema(parseUnion(schema.values, depth, namespace));
      }

      return new MapSchema(parseSchema(schema.values, depth, namespace));

    case 'enum':
      return new EnumSchema(depth, schema.name, schema.namespace || namespace, schema.symbols);

    default:
      return new SimpleType(schema);
  }
};

const parseUnion = (schemas: any[], depth: number, namespace: string): Schema => {
  // We don't consider nulllable types 
  if (schemas.length === 2 && schemas.includes("null")) {
    const nonNullSchema = schemas[schemas.indexOf("null") ^ 1];

    if (isSimpleType(nonNullSchema)) {
      return new SimpleType(nonNullSchema);
    }

    return parseSchema(nonNullSchema, depth, namespace);
  }

  const subTypes = schemas.map((type: any) => {
    if (isSimpleType(type)) {
      return new SimpleType(type);
    }

    return parseSchema(type, depth, namespace);
  })

  return new UnionSchema(subTypes);
}
