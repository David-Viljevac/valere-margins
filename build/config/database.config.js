"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../database/entities/user.entity");
const class_entity_1 = require("../database/entities/class.entity");
const user_class_entity_1 = require("../database/entities/user-class.entity");
const sport_entity_1 = require("../database/entities/sport.entity");
const role_entity_1 = require("../database/entities/role.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: 'localhost',
    port: 5432,
    username: 'valere',
    password: 'admin',
    database: 'valere',
    synchronize: false,
    logging: true,
    entities: [user_entity_1.User, class_entity_1.Class, user_class_entity_1.UserClass, sport_entity_1.Sport, role_entity_1.Role],
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=database.config.js.map