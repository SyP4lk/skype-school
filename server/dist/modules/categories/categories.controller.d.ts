import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    findAll(): Promise<{
        name: string;
        id: string;
    }[]>;
    findOne(id: string): Promise<{
        name: string;
        id: string;
    } | null>;
    create(data: {
        name: string;
    }): Promise<{
        name: string;
        id: string;
    }>;
    remove(id: string): Promise<{
        name: string;
        id: string;
    }>;
}
