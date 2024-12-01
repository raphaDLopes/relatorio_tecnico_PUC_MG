import swaggerJsDoc from'swagger-jsdoc';


const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Api Voluntariado',
            version: '1.0.0',
            description: 'Documentação da API',
        },
        servers: [
            {
                url: 'http://localhost:4000/',
            },
        ],
        components: {
            securitySchemes: {
              bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ]
        
    },
    
    apis: ['./src/controllers/*.js'],
};

export const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default {
    swaggerDocs
}