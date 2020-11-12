const TypeORMOptions = {
    type: 'sqlite',
    name: 'db_local',
    database: './database.db',
    entities: ["./entity/*.entity.{js,ts}"],
    synchronize: true
}
