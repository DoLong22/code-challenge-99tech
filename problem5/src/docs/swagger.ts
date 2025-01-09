import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import path from 'path';
import { logger } from '../common/logger';
import { loadDtoSchemas } from '../utils/dto-to-schema';

const schemas = loadDtoSchemas(path.join(__dirname, '../services'));

const swaggerOptions: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'User API Documentation',
            version: '1.0.0',
            description: 'This is the API documentation for the User service.',
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
                description: 'Development server',
            },
        ],
        components: {
            schemas: {
                ...schemas,
                ErrorDetail: {
                    type: 'object',
                    properties: {
                        field: {
                            type: 'string',
                            description: 'The field that caused the error'
                        },
                        message: {
                            type: 'string',
                            description: 'Error message for this field'
                        }
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'string',
                            example: 'error'
                        },
                        code: {
                            type: 'integer',
                            format: 'int32'
                        },
                        message: {
                            type: 'string'
                        },
                        details: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/ErrorDetail'
                            }
                        },
                        requestId: {
                            type: 'string'
                        }
                    }
                }
            },
        },
    },
    apis: ['./src/services/*/*.ts'], // Path to files containing API annotations
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export const setupSwagger = (app: Express) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    logger.info('Swagger docs available at http://localhost:3000/api-docs');
};
