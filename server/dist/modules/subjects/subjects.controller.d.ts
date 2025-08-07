import { SubjectsService } from './subjects.service';
export declare class SubjectsController {
    private readonly subjectsService;
    constructor(subjectsService: SubjectsService);
    findAll(): Promise<{
        name: string;
        id: string;
        categoryId: string;
    }[]>;
    findOne(id: string): Promise<{
        name: string;
        id: string;
        categoryId: string;
    } | null>;
    create(data: {
        name: string;
        categoryId: string;
    }): Promise<{
        name: string;
        id: string;
        categoryId: string;
    }>;
    update(id: string, data: {
        name?: string;
        categoryId?: string;
    }): Promise<{
        name: string;
        id: string;
        categoryId: string;
    }>;
    remove(id: string): Promise<{
        name: string;
        id: string;
        categoryId: string;
    }>;
}
