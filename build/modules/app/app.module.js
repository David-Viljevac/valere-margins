"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const classes_controller_1 = require("../classes/classes.controller");
const classes_service_1 = require("../classes/classes.service");
const classes_repository_1 = require("../classes/classes.repository");
const database_module_1 = require("../../database/database.module");
const users_controller_1 = require("../users/users.controller");
const users_repository_1 = require("../users/users.repository");
const users_service_1 = require("../users/users.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [app_controller_1.AppController, classes_controller_1.ClassesController, users_controller_1.UsersController],
        providers: [app_service_1.AppService, classes_service_1.ClassesService, classes_repository_1.ClassesRepository, users_repository_1.UsersRepository, users_service_1.UsersService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map