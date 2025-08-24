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
exports.ClassesService = void 0;
const common_1 = require("@nestjs/common");
const classes_repository_1 = require("./classes.repository");
let ClassesService = class ClassesService {
    constructor(classesRepository) {
        this.classesRepository = classesRepository;
    }
    async findAll() {
        return this.classesRepository.findAll();
    }
    async findByFilters(filters) {
        return this.classesRepository.findByFilters(filters);
    }
    async findOne(id) {
        const classEntity = await this.classesRepository.findOne(id);
        if (!classEntity) {
            throw new common_1.NotFoundException(`Class with ID ${id} not found`);
        }
        return classEntity;
    }
    //   async create(createClassDto: CreateClassDto): Promise<Class> {
    //     return this.classesRepository.create(createClassDto);
    //   }
    //   async update(id: string, updateClassDto: UpdateClassDto): Promise<Class> {
    //     const existingClass = await this.findOne(id);
    //     return this.classesRepository.update(id, updateClassDto);
    //   }
    async delete(id) {
        await this.findOne(id); // Check if exists
        await this.classesRepository.delete(id);
    }
    //   async applyForClass(userId: string, classId: string): Promise<void> {
    //     // Check if class exists
    //     await this.findOne(classId);
    //     // Check if user already applied
    //     const existingApplication = await this.userClassRepository.findByUserAndClass(userId, classId);
    //     if (existingApplication) {
    //       throw new ConflictException('User already applied for this class');
    //     }
    //     await this.userClassRepository.create({ user_id: userId, class_id: classId });
    //   }
    async getStats() {
        return this.classesRepository.getStats();
    }
};
exports.ClassesService = ClassesService;
exports.ClassesService = ClassesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [classes_repository_1.ClassesRepository])
], ClassesService);
//# sourceMappingURL=classes.service.js.map