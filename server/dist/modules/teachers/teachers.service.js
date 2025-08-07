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
exports.TeachersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let TeachersService = class TeachersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(filter) {
        let where = {};
        if (filter?.categoryId || filter?.subjectId) {
            const teacherSubjectWhere = {};
            if (filter.subjectId) {
                teacherSubjectWhere.subjectId = filter.subjectId;
            }
            if (filter.categoryId) {
                teacherSubjectWhere.subject = { categoryId: filter.categoryId };
            }
            where.teacherSubjects = { some: teacherSubjectWhere };
        }
        return this.prisma.teacher.findMany({
            where,
            include: {
                teacherSubjects: {
                    include: { subject: true }
                }
            }
        });
    }
    async findOne(id) {
        return this.prisma.teacher.findUnique({
            where: { id },
            include: {
                teacherSubjects: { include: { subject: true } }
            }
        });
    }
    async create(data) {
        return this.prisma.teacher.create({
            data,
        });
    }
    async update(id, data) {
        if (!data || Object.keys(data).length === 0) {
            throw new Error("Нет данных для обновления");
        }
        return this.prisma.teacher.update({
            where: { id },
            data,
        });
    }
    async remove(id) {
        return this.prisma.teacher.delete({
            where: { id },
        });
    }
};
exports.TeachersService = TeachersService;
exports.TeachersService = TeachersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TeachersService);
//# sourceMappingURL=teachers.service.js.map