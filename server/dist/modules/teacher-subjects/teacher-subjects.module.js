"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherSubjectsModule = void 0;
const common_1 = require("@nestjs/common");
const teacher_subjects_controller_1 = require("./teacher-subjects.controller");
const teacher_subjects_service_1 = require("./teacher-subjects.service");
let TeacherSubjectsModule = class TeacherSubjectsModule {
};
exports.TeacherSubjectsModule = TeacherSubjectsModule;
exports.TeacherSubjectsModule = TeacherSubjectsModule = __decorate([
    (0, common_1.Module)({
        controllers: [teacher_subjects_controller_1.TeacherSubjectsController],
        providers: [teacher_subjects_service_1.TeacherSubjectsService],
    })
], TeacherSubjectsModule);
//# sourceMappingURL=teacher-subjects.module.js.map