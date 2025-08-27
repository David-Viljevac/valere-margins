import { AppDataSource } from "./config/database.config"

AppDataSource.initialize().then(async () => {

   

}).catch(error => console.log(error))
