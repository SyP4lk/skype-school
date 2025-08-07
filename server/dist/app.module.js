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
const categories_module_1 = require("./modules/categories/categories.module");
const subjects_controller_1 = require("./modules/subjects/subjects.controller");
const subjects_service_1 = require("./modules/subjects/subjects.service");
const teachers_module_1 = require("./modules/teachers/teachers.module");
const teacher_subjects_module_1 = require("./modules/teacher-subjects/teacher-subjects.module");
const prisma_module_1 = require("./prisma/prisma.module");
const subjects_module_1 = require("./modules/subjects/subjects.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [categories_module_1.CategoriesModule, teachers_module_1.TeachersModule, teacher_subjects_module_1.TeacherSubjectsModule, prisma_module_1.PrismaModule, teachers_module_1.TeachersModule, teacher_subjects_module_1.TeacherSubjectsModule, subjects_module_1.SubjectsModule],
        controllers: [app_controller_1.AppController, subjects_controller_1.SubjectsController],
        providers: [app_service_1.AppService, subjects_service_1.SubjectsService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map