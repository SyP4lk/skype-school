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
exports.TeacherSubjectsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let TeacherSubjectsService = class TeacherSubjectsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.teacherSubject.findMany();
    }
    async findByTeacher(teacherId) {
        return this.prisma.teacherSubject.findMany({ where: { teacherId } });
    }
    async findOne(id) {
        return this.prisma.teacherSubject.findUnique({ where: { id } });
    }
    async create(data) {
        return this.prisma.teacherSubject.create({
            data: {
                teacherId: data.teacherId,
                subjectId: data.subjectId,
                price: data.price,
                duration: data.duration,
            },
        });
    }
    async update(id, data) {
        return this.prisma.teacherSubject.update({
            where: { id },
            data,
        });
    }
    async remove(id) {
        return this.prisma.teacherSubject.delete({ where: { id } });
    }
};
exports.TeacherSubjectsService = TeacherSubjectsService;
exports.TeacherSubjectsService = TeacherSubjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TeacherSubjectsService);
//# sourceMappingURL=teacher-subjects.service.js.map