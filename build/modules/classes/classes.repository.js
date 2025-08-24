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
exports.ClassesRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const class_entity_1 = require("../../database/entities/class.entity");
let ClassesRepository = class ClassesRepository {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.classRepository = this.dataSource.getRepository(class_entity_1.Class);
    }
    async findAll() {
        return this.classRepository.find({
            relations: ['sport', 'userClasses', 'userClasses.user'],
            order: { created_at: 'DESC' }
        });
    }
    async findByFilters(filters) {
        const query = this.classRepository.createQueryBuilder('class')
            .leftJoinAndSelect('class.sport', 'sport')
            .leftJoinAndSelect('class.userClasses', 'userClasses')
            .leftJoinAndSelect('userClasses.user', 'user');
        if (filters.sports?.length) {
            query.andWhere('sport.name IN (:...sports)', { sports: filters.sports });
        }
        if (filters.isActive !== undefined) {
            query.andWhere('class.is_active = :isActive', { isActive: filters.isActive });
        }
        if (filters.activeDays?.length) {
            query.andWhere('class.active_days && :activeDays', { activeDays: filters.activeDays });
        }
        return query.orderBy('class.created_at', 'DESC').getMany();
    }
    async findOne(id) {
        return this.classRepository.findOne({
            where: { id },
            relations: ['sport', 'userClasses', 'userClasses.user', 'userClasses.user.role'],
        });
    }
    async create(classData) {
        const newClass = this.classRepository.create(classData);
        return this.classRepository.save(newClass);
    }
    async update(id, classData) {
        await this.classRepository.update(id, classData);
        return this.findOne(id);
    }
    async delete(id) {
        await this.classRepository.delete(id);
    }
    async getStats() {
        return this.classRepository
            .createQueryBuilder('class')
            .select([
            'COUNT(*) as total_classes',
            'COUNT(CASE WHEN class.is_active = true THEN 1 END) as active_classes',
            'sport.name as sport_name',
            'COUNT(DISTINCT userClasses.user_id) as enrolled_users'
        ])
            .leftJoin('class.sport', 'sport')
            .leftJoin('class.userClasses', 'userClasses')
            .groupBy('sport.id, sport.name')
            .getRawMany();
    }
};
exports.ClassesRepository = ClassesRepository;
exports.ClassesRepository = ClassesRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('DATA_SOURCE')),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], ClassesRepository);
//# sourceMappingURL=classes.repository.js.map