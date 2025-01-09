import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import fs from 'fs';
import path from 'path';

/**
 * Converts a class-validator-based DTO to JSON Schema.
 * @param dtoClass The DTO class to convert.
 * @returns JSON Schema for the DTO.
 */
export const dtoToSchema = (dtoClass: any) => {
    const schemas = validationMetadatasToSchemas();
    return schemas[dtoClass.name];
};


/**
 * Dynamically loads all DTO schemas from a directory.
 * @param dtoPath The path to the DTO directory.
 * @returns An object containing all schemas.
 */
export const loadDtoSchemas = (dtoPath: string): Record<string, any> => {
  const schemas: Record<string, any> = {};

  const files = fs.readdirSync(dtoPath, { withFileTypes: true });

  files.forEach((file) => {
    const filePath = path.join(dtoPath, file.name);

    if (file.isDirectory()) {
      Object.assign(schemas, loadDtoSchemas(filePath));
    } else if (file.isFile() && file.name.endsWith('.dto.ts')) {
      const moduleExports = require(filePath);

      Object.keys(moduleExports).forEach((exportedName) => {
        const exportedValue = moduleExports[exportedName];

        if (typeof exportedValue === 'function' && exportedValue.name.endsWith('Dto')) {
          schemas[exportedValue.name] = dtoToSchema(exportedValue);
        }

        if (exportedName.endsWith('Schema') && typeof exportedValue === 'object') {
          const schemaName = exportedName.replace(/Schema$/, ''); // Strip "Schema" from the name
          schemas[schemaName] = exportedValue;
        }
      });
    }
  });

  return schemas;
};
