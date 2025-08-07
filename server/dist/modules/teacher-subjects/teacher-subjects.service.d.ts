import { PrismaService } from '../../prisma/prisma.service';
import { TeacherSubject } from '@prisma/client';
export declare class TeacherSubjectsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<TeacherSubject[]>;
    findByTeacher(teacherId: string): Promise<TeacherSubject[]>;
    findOne(id: string): Promise<TeacherSubject | null>;
    create(data: {
        teacherId: string;
        subjectId: string;
        price: number;
        duration: number;
    }): Promise<TeacherSubject>;
    update(id: string, data: {
        price?: number;
        duration?: number;
    }): Promise<TeacherSubject>;
    remove(id: string): Promise<TeacherSubject>;
}
