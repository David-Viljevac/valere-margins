"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_config_1 = require("./config/database.config");
database_config_1.AppDataSource.initialize().then(async () => {
    // console.log("Inserting a new user into the database...")
    // const user = new User()
    // user.first_name = "Timber"
    // user.last_name = "Saw"
    // await AppDataSource.manager.save(user)
    // console.log("Saved a new user with id: " + user.id)
    // console.log("Loading users from the database...")
    // const users = await AppDataSource.manager.find(User)
    // console.log("Loaded users: ", users)
    // console.log("Here you can setup and run express / fastify / any other framework.")
}).catch(error => console.log(error));
//# sourceMappingURL=index.js.map