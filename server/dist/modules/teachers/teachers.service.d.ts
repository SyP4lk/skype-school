import { PrismaService } from '../../prisma/prisma.service';
export declare class TeachersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(filter?: {
        categoryId?: string;
        subjectId?: string;
    }): Promise<({
        teacherSubjects: ({
            subject: {
                name: string;
                id: string;
                categoryId: string;
            };
        } & {
            id: string;
            subjectId: string;
            teacherId: string;
            price: number;
            duration: number;
        })[];
    } & {
        id: string;
        firstName: string;
        lastName: string;
        photo: string | null;
        aboutShort: string | null;
        aboutFull: string | null;
        education: string | null;
        experience: string | null;
        isActive: boolean;
        sortOrder: number;
    })[]>;
    findOne(id: string): Promise<any>;
    create(data: any): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        photo: string | null;
        aboutShort: string | null;
        aboutFull: string | null;
        education: string | null;
        experience: string | null;
        isActive: boolean;
        sortOrder: number;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        photo: string | null;
        aboutShort: string | null;
        aboutFull: string | null;
        education: string | null;
        experience: string | null;
        isActive: boolean;
        sortOrder: number;
    }>;
    remove(id: string): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        photo: string | null;
        aboutShort: string | null;
        aboutFull: string | null;
        education: string | null;
        experience: string | null;
        isActive: boolean;
        sortOrder: number;
    }>;
}
