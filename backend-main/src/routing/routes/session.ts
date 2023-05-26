/**
 * @author Lars Brinker
 */
import { Router, Request, Response } from 'express';
import { SessionController } from '../../controllers/session';
import { UserInterface } from '../../repository/interfaces/user-interface';
import { SessionService } from '../../services/session';

export class SessionRoute {
    private router: Router;
    private sessionController: SessionController;

    public constructor(private sessionService: SessionService) {
        this.router = Router();
        this.sessionController = new SessionController(this.sessionService);
        this.initRoutes();
    }
    public getRouter(): Router {
        return this.router;
    }

    private initRoutes(): void {
        this.router.post('/', this.validateUserInput.bind(this), (request: Request, response: Response) => {
            this.sessionController.validateLogin(request, response);
        });

        this.router.get('/', (request: Request, response: Response) => {
            this.sessionController.getUserBySession(request, response);
        });

        this.router.delete('/', (request: Request, response: Response) => {
            this.sessionController.logUserOut(request, response);
        });
    }

    private async validateUserInput(request: Request, response: Response, next: Function): Promise<void> {
        if (!(await this.sessionController.validateUserInput(request, response))) {
            next();
        }
    }
}
