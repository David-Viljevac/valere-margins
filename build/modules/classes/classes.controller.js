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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const classes_service_1 = require("./classes.service");
// import { CreateClassDto } from './dto/create-class.dto';
// import { UpdateClassDto } from './dto/update-class.dto';
// import { FilterClassesDto } from './dto/filter-classes.dto';
const response_dto_1 = require("../../common/dto/response.dto");
const filter_classes_dto_1 = require("../../common/dto/filter-classes.dto");
// import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
// import { RolesGuard } from '../../common/guards/roles.guard';
// import { Roles } from '../../common/decorators/roles.decorator';
// import { Public } from '../../common/decorators/public.decorator';
let ClassesController = class ClassesController {
    constructor(classesService) {
        this.classesService = classesService;
    }
    async findByFilters(filters) {
        const classes = await this.classesService.findByFilters(filters);
        return response_dto_1.ResponseFactory.success(classes, 'Classes retrieved successfully');
    }
    async findAll() {
        const classes = await this.classesService.findAll();
        return response_dto_1.ResponseFactory.success(classes, 'Classes retrieved successfully');
    }
    async getStats() {
        const stats = await this.classesService.getStats();
        return response_dto_1.ResponseFactory.success(stats, 'Statistics retrieved successfully');
    }
    async findOne(id) {
        const classEntity = await this.classesService.findOne(id);
        return response_dto_1.ResponseFactory.success(classEntity, 'Class details retrieved successfully');
    }
    //   @Post()
    //   @Roles('admin')
    //   @ApiBearerAuth()
    //   @ApiOperation({ summary: 'Create a new class (Admin only)' })
    //   async create(@Body() createClassDto: CreateClassDto) {
    //     const newClass = await this.classesService.create(createClassDto);
    //     return ResponseFactory.success(newClass, 'Class created successfully');
    //   }
    //   @Put(':id')
    //   @Roles('admin')
    //   @ApiBearerAuth()
    //   @ApiOperation({ summary: 'Update a class (Admin only)' })
    //   async update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
    //     const updatedClass = await this.classesService.update(id, updateClassDto);
    //     return ResponseFactory.success(updatedClass, 'Class updated successfully');
    //   }
    async delete(id) {
        await this.classesService.delete(id);
        return response_dto_1.ResponseFactory.success(null, 'Class deleted successfully');
    }
};
exports.ClassesController = ClassesController;
__decorate([
    (0, common_1.Get)()
    //   @Public()
    ,
    (0, swagger_1.ApiOperation)({ summary: 'Get all classes with optional filters' }),
    (0, swagger_1.ApiQuery)({ name: 'sports', required: false, type: [String] }),
    (0, swagger_1.ApiQuery)({ name: 'isActive', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'activeDays', required: false, type: [String] }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_classes_dto_1.FilterClassesDto]),
    __metadata("design:returntype", Promise)
], ClassesController.prototype, "findByFilters", null);
__decorate([
    (0, common_1.Get)()
    // @Public()
    ,
    (0, swagger_1.ApiOperation)({ summary: 'Get all classes' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClassesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('stats')
    //   @Roles('admin')
    ,
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get classes statistics (Admin only)' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClassesController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)(':id')
    //   @Public()
    ,
    (0, swagger_1.ApiOperation)({ summary: 'Get class details by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClassesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id')
    //   @Roles('admin')
    ,
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a class (Admin only)' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClassesController.prototype, "delete", null);
exports.ClassesController = ClassesController = __decorate([
    (0, swagger_1.ApiTags)('classes'),
    (0, common_1.Controller)('/classes')
    // @UseGuards(JwtAuthGuard, RolesGuard)
    ,
    __metadata("design:paramtypes", [classes_service_1.ClassesService])
], ClassesController);
//# sourceMappingURL=classes.controller.js.map