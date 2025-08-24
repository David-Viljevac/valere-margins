"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const classes_service_1 = require("../classes/classes.service");
let AppController = class AppController {
    constructor(classesService) {
        this.classesService = classesService;
    }
    async getHomePage() {
        try {
            const classes = await this.classesService.findAll();
            console.log(classes);
            return {
                title: 'Sports Complex Dashboard',
                classes: classes,
                hasClasses: classes.length > 0
            };
        }
        catch (error) {
            return {
                title: 'Sports Complex Dashboard',
                classes: [],
                hasClasses: false,
                error: 'Failed to load classes'
            };
        }
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Render)('pages/index'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getHomePage", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [classes_service_1.ClassesService])
], AppController);
//# sourceMappingURL=app.controller.js.map