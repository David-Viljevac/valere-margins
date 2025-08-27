import "reflect-metadata"
import { DataSource } from "typeorm"
import { env } from "./env.config"
import { User } from "../database/entities/user.entity"
import { Class } from "../database/entities/class.entity"
import { UserClass } from "../database/entities/user-class.entity"
import { Sport } from "../database/entities/sport.entity"
import { Role } from "../database/entities/role.entity"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: true,
    entities: [User,Class,UserClass,Sport,Role],
    migrations: [],
    subscribers: [],
})
