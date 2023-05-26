/**
 * @author Lars Brinker
 */
import { Router, Request, Response } from 'express';
import { ContentController } from '../../controllers/content';
import { ContentInterface } from '../../repository/interfaces/content-interface';
import { ContentService } from '../../services/content';

export class ContentRoute {
    private router: Router;
    private contentController: ContentController;

    constructor(private contentRepository: ContentInterface) {
        this.router = Router();
        this.contentController = new ContentController(new ContentService(this.contentRepository));
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get('/', (request: Request, response: Response) => {
            this.contentController.getContent(request, response);
        });
    }

    public getRouter(): Router {
        return this.router;
    }
}
