import { DataSource } from "typeorm"

export const MyDataSource = new DataSource({
    "type": "postgres",
    "host": "pg_db",
    "port": 5432,
    "username": "postgres",
    "password": "5C#z975DmJ6!MF#9k@GD",
    "database": "QueChall",
    "synchronize": true,
    "logging": true,
    "entities": [
       "api/src/entity/**/*.ts"
    ],
    "migrations": [
       "api/src/migration/**/*.ts"
    ],
    "subscribers": [
       "api/src/subscriber/**/*.ts"
    ]
})
