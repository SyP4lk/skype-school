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
exports.TeacherSubjectsController = void 0;
const common_1 = require("@nestjs/common");
const teacher_subjects_service_1 = require("./teacher-subjects.service");
let TeacherSubjectsController = class TeacherSubjectsController {
    teacherSubjectsService;
    constructor(teacherSubjectsService) {
        this.teacherSubjectsService = teacherSubjectsService;
    }
    findAll(teacherId) {
        if (teacherId)
            return this.teacherSubjectsService.findByTeacher(teacherId);
        return this.teacherSubjectsService.findAll();
    }
    findOne(id) {
        return this.teacherSubjectsService.findOne(id);
    }
    create(data) {
        console.log("CREATE TeacherSubject", data);
        return this.teacherSubjectsService.create(data);
    }
    update(id, data) {
        return this.teacherSubjectsService.update(id, data);
    }
    remove(id) {
        return this.teacherSubjectsService.remove(id);
    }
};
exports.TeacherSubjectsController = TeacherSubjectsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('teacherId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TeacherSubjectsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TeacherSubjectsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TeacherSubjectsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TeacherSubjectsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TeacherSubjectsController.prototype, "remove", null);
exports.TeacherSubjectsController = TeacherSubjectsController = __decorate([
    (0, common_1.Controller)('teacher-subjects'),
    __metadata("design:paramtypes", [teacher_subjects_service_1.TeacherSubjectsService])
], TeacherSubjectsController);
//# sourceMappingURL=teacher-subjects.controller.js.map