import { PrismaService } from '../../prisma/prisma.service';
import { Category } from '@prisma/client';
export declare class CategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<Category[]>;
    findOne(id: string): Promise<Category | null>;
    create(data: {
        name: string;
    }): Promise<Category>;
    update(id: string, data: {
        name: string;
    }): Promise<Category>;
    remove(id: string): Promise<Category>;
}
