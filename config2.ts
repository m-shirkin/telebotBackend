export default {
    typeORMOptions: {
        type: 'sqlite',
        database: './database.db',
        autoLoadEntities: true,
        synchronize: true
    },
    urlOptions: {
        globalPrefix: 'api',
        port: 3000
    },
    swaggerOptions: {
        title: 'Message database API',
        description: 'API for storing and retrieving telegram users and messages',
        version: '1.0',
    },
}
