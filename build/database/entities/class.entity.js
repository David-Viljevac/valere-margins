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
exports.Class = exports.DayOfWeek = void 0;
const typeorm_1 = require("typeorm");
const sport_entity_1 = require("./sport.entity");
const uuid_1 = require("uuid");
const user_class_entity_1 = require("./user-class.entity");
// Define the enum for days of the week
var DayOfWeek;
(function (DayOfWeek) {
    DayOfWeek["MONDAY"] = "Monday";
    DayOfWeek["TUESDAY"] = "Tuesday";
    DayOfWeek["WEDNESDAY"] = "Wednesday";
    DayOfWeek["THURSDAY"] = "Thursday";
    DayOfWeek["FRIDAY"] = "Friday";
    DayOfWeek["SATURDAY"] = "Saturday";
    DayOfWeek["SUNDAY"] = "Sunday";
})(DayOfWeek || (exports.DayOfWeek = DayOfWeek = {}));
let Class = class Class {
    generateId() {
        if (!this.id) {
            this.id = (0, uuid_1.v7)();
        }
    }
};
exports.Class = Class;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid'),
    __metadata("design:type", String)
], Class.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], Class.prototype, "sport_id", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamptz'),
    __metadata("design:type", Date)
], Class.prototype, "start_time", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamptz'),
    __metadata("design:type", Date)
], Class.prototype, "end_time", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Class.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], Class.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], Class.prototype, "edited_at", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean'),
    __metadata("design:type", Boolean)
], Class.prototype, "is_active", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: DayOfWeek,
        array: true
    }),
    __metadata("design:type", Array)
], Class.prototype, "active_days", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Class.prototype, "generateId", null);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sport_entity_1.Sport, sport => sport.classes),
    (0, typeorm_1.JoinColumn)({ name: 'sport_id' }),
    __metadata("design:type", sport_entity_1.Sport
    // Many-to-Many relationship through junction table
    )
], Class.prototype, "sport", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_class_entity_1.UserClass, userClass => userClass.class),
    __metadata("design:type", Array)
], Class.prototype, "userClasses", void 0);
exports.Class = Class = __decorate([
    (0, typeorm_1.Entity)('class')
], Class);
//# sourceMappingURL=class.entity.js.map