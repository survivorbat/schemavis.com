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

export interface Schema {
  records(): RecordSchema[];
  enums(): EnumSchema[];
  typeName(): string;
}

export class RecordSchema implements Schema {
  constructor(readonly name: string, readonly namespace: string | undefined, readonly fields: RecordField[]) { }

  records(): RecordSchema[] {
    return [this, ...this.fields.flatMap((field) => field.type.records())]
  }

  enums(): EnumSchema[] {
    return this.fields.flatMap((field) => field.type.enums())
  }

  typeName(): string {
    return this.name;
  }
}

export class RecordField {
  constructor(readonly name: string, readonly type: Schema) { }
}

export class EnumSchema implements Schema {
  constructor(readonly name: string, readonly namespace: string | undefined, readonly symbols: string[]) { }

  records(): RecordSchema[] {
    return [];
  }

  enums(): EnumSchema[] {
    return [this]
  }

  typeName(): string {
    return this.name;
  }
}

export class ArraySchema implements Schema {
  constructor(readonly items: Schema) { }

  records(): RecordSchema[] {
    return this.items.records();
  }

  enums(): EnumSchema[] {
    return this.items.enums();
  }

  typeName(): string {
    return `${this.items.typeName()}[]`
  }
}

export class MapSchema {
  constructor(readonly values: Schema) { }

  records(): RecordSchema[] {
    return this.values.records();
  }

  enums(): EnumSchema[] {
    return this.values.enums();
  }

  typeName(): string {
    return `map[string]${this.values.typeName()}`
  }
}

export class UnionSchema implements Schema {
  constructor(readonly types: Schema[]) { }

  records(): RecordSchema[] {
    return this.types.flatMap((type) => type.records());
  }

  enums(): EnumSchema[] {
    return this.types.flatMap((type) => type.enums());
  }

  typeName(): string {
    return this.types.map((type): string => type.typeName()).join(" | ")
  }
}

export class SimpleType implements Schema {
  constructor(readonly type: string | { type: string; logicalType: string }) { }

  records(): RecordSchema[] {
    return []
  }

  enums(): EnumSchema[] {
    return []
  }

  typeName(): string {
    if (typeof this.type === "object") {
      return this.type.logicalType
    }

    return this.type
  }
}

export const parseSchema = (schema: any, namespace: string): Schema => {
  switch (schema.type) {
    case 'record':
      const fields = schema.fields.map((field: any): RecordField => {
        if (isSimpleType(field.type)) {
          return new RecordField(field.name, new SimpleType(field.type));
        }

        if (Array.isArray(field.type)) {
          return new RecordField(field.name, parseUnion(field.type, schema.namespace || namespace))
        }

        const subSchema = parseSchema(field.type, schema.namespace || namespace);
        return new RecordField(field.name, subSchema);
      });

      return new RecordSchema(schema.name, schema.namespace || namespace, fields);

    case 'array':
      if (isSimpleType(schema.items)) {
        return new ArraySchema(new SimpleType(schema.items));
      }

      return new ArraySchema(parseSchema(schema.items, namespace));

    case 'map':
      if (isSimpleType(schema.values)) {
        return new MapSchema(new SimpleType(schema.values));
      }

      return new MapSchema(parseSchema(schema.values, namespace));

    case 'enum':
      return new EnumSchema(schema.name, schema.namespace || namespace, schema.symbols);
  }

  throw new Error(`failed to determine type: ${schema}`);
};

const parseUnion = (schemas: any[], namespace: string): Schema => {
  // We don't consider nulllable types 
  if (schemas.length == 2 && schemas.includes("null")) {
    const nonNullSchema = schemas[schemas.indexOf("null") ^ 1];

    if (isSimpleType(nonNullSchema)) {
      return new SimpleType(nonNullSchema);
    }

    return parseSchema(nonNullSchema, namespace);
  }

  const subTypes = schemas.map((type: any) => {
    if (isSimpleType(type)) {
      return new SimpleType(type);
    }

    return parseSchema(type, namespace);
  })

  return new UnionSchema(subTypes);
}
