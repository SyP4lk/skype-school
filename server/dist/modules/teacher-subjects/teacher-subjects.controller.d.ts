import { TeacherSubjectsService } from './teacher-subjects.service';
export declare class TeacherSubjectsController {
    private readonly teacherSubjectsService;
    constructor(teacherSubjectsService: TeacherSubjectsService);
    findAll(teacherId?: string): Promise<{
        id: string;
        subjectId: string;
        teacherId: string;
        price: number;
        duration: number;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        subjectId: string;
        teacherId: string;
        price: number;
        duration: number;
    } | null>;
    create(data: {
        teacherId: string;
        subjectId: string;
        price: number;
        duration: number;
    }): Promise<{
        id: string;
        subjectId: string;
        teacherId: string;
        price: number;
        duration: number;
    }>;
    update(id: string, data: {
        price?: number;
        duration?: number;
    }): Promise<{
        id: string;
        subjectId: string;
        teacherId: string;
        price: number;
        duration: number;
    }>;
    remove(id: string): Promise<{
        id: string;
        subjectId: string;
        teacherId: string;
        price: number;
        duration: number;
    }>;
}
