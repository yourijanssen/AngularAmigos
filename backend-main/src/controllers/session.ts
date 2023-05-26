/**
 * @author Lars Brinker
 */
import { error } from 'console';
import { Request, Response } from 'express';
import { Session } from '../business/session';
import { User } from '../business/user';
import { SessionService } from '../services/session';

export class SessionController {
    public constructor(private sessionService: SessionService) {}

    /**
     *
     * @param request Request object
     * @param response Response object
     */
    public async validateLogin(request: Request, response: Response): Promise<void> {
        let userObjectFromDB: User | null = await this.checkIfUserExists(request);
        try {
            if (userObjectFromDB == null) {
                throw error;
            }
            let userLogin: boolean = await this.sessionService.checkPassword(
                request.body.password,
                userObjectFromDB?.password
            );
            if (!userLogin) {
                throw error;
            } else {
                this.logUserIn(userObjectFromDB.id, response);
                response
                    .status(200)
                    .json({ status: 'succes', data: { post: { message: 'Correct email and password!' } } });
            }
        } catch {
            response.status(404).json({ status: 'fail', data: { post: { message: 'Wrong email or password!' } } });
        }
    }

    /**
     * Log a user in with the given userID
     * @param userID number
     */
    public logUserIn(userID: number, response: Response): void {
        let session: Session = Session.setCookieForUser(userID);
        response.cookie('sessionID', session.sessionId, { maxAge: new Date().getTime() + 7889400000, httpOnly: true });
        this.sessionService.saveSession(userID, session.sessionId, session.expirationDate);
    }

    /**
     * Log a user out with the give sessionID
     * @param request request object
     * @param response response object
     */
    public async logUserOut(request: Request, response: Response) {
        let sessionID: string = request.cookies.sessionID;
        let session = await this.sessionService.getSession(sessionID);
        if (sessionID && (await session!.validateCookie(await this.sessionService.getSession(sessionID)))) {
            await this.sessionService.deleteSession(sessionID);
            response.clearCookie('sessionID');
            response
                .status(200)
                .json({ status: 'succes', data: { post: { message: 'Deleted session successfully!' } } });
        } else {
            response.status(404).json({ status: 'failed', data: { post: { message: 'No session found!' } } });
        }
    }

    /**
     * Get a user by a sessionID
     * @param request Request object
     * @param response Response object
     */
    public async getUserBySession(request: Request, response: Response): Promise<void> {
        let sessionID: string = request.cookies.sessionID;
        let session = await this.sessionService.getSession(sessionID);
        if (sessionID && (await session!.validateCookie(session))) {
            let user = await this.sessionService.getUserBySession(sessionID);
            response.status(200).json({ status: 'succes', data: { post: { user: user } } });
        } else {
            response.status(404).json({ status: 'failed', data: { post: { message: 'No session found!' } } });
            response.end();
        }
    }

    /**
     * Check if the inputted password and email is meeting the requirements
     * @param request Request object
     * @param response Response object
     * @returns true if the user input is wrong
     */
    public async validateUserInput(request: Request, response: Response) {
        let userInput: boolean = false;
        let user: User | null = await this.sessionService.getLogin(request.body.email);
        if (user != null) {
            if (!User.validatePassword(request.body.password) || !User.validateEmail(request.body.email)) {
                response.status(404).json({
                    status: 'error',
                    data: { post: { message: 'Wrong email format or password does not meet requirements!' } },
                });
                userInput = true;
            }
        }
        return userInput;
    }

    /**
     * Check if a user exists in the database
     * @param request Request object
     * @returns user object or null
     */
    private async checkIfUserExists(request: Request): Promise<User | null> {
        let doesUserExists: User | null = await this.sessionService.getLogin(request.body.email);
        return doesUserExists;
    }
}
