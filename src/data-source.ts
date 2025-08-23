import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./database/entities/user.entity"
import { Class } from "./database/entities/class.entity"
import { UserClass } from "./database/entities/user-class.entity"
import { Sport } from "./database/entities/sport.entity"
import { Role } from "./database/entities/role.entity"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "valere",
    password: "admin",
    database: "valere",
    synchronize: true,
    logging: true,
    entities: [User,Class,UserClass,Sport,Role],
    migrations: [],
    subscribers: [],
})
