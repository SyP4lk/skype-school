import { PrismaService } from '../../prisma/prisma.service';
import { Subject } from '@prisma/client';
export declare class SubjectsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<Subject[]>;
    findOne(id: string): Promise<Subject | null>;
    create(data: {
        name: string;
        categoryId: string;
    }): Promise<Subject>;
    update(id: string, data: {
        name?: string;
        categoryId?: string;
    }): Promise<Subject>;
    remove(id: string): Promise<Subject>;
}
