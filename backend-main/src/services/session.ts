/**
 * @author Lars Brinker
 */
import { User } from '../business/user';
import bcrypt from 'bcrypt';
import { Session } from '../business/session';
import { UserInterface } from '../repository/interfaces/user-interface';

export class SessionService {
    public constructor(private userInterface: UserInterface) {}

    /**
     * Get the login info from a given user email.
     * @param userMail string
     * @returns User
     */
    public async getLogin(userMail: string): Promise<User | null> {
        return await this.userInterface.getUserByMail(userMail);
    }
    /**
     * Check if the inputted password matches the one in the database.
     * @param userPassword string
     * @param dbPassword string
     * @returns boolean
     */
    public async checkPassword(userPassword: string, dbPassword: string): Promise<boolean> {
        return await bcrypt.compare(userPassword, dbPassword);
    }

    /**
     * Save a session in the database.
     * @param userID number
     * @param sessionID string
     * @param expirationDate Date
     * @returns Session
     */
    public async saveSession(userID: number, sessionID: string, expirationDate: Date): Promise<Session> {
        return await this.userInterface.saveSession(userID, sessionID, expirationDate);
    }

    /**
     * @param sessionID string
     * @returns Number
     */
    public async deleteSession(sessionID: string): Promise<Number> {
        return await this.userInterface.deleteSession(sessionID);
    }

    public async getSession(sessionID: string): Promise<Session | null> {
        if (sessionID != undefined) return await this.userInterface.getSession(sessionID);
        return null;
    }

    public async getUserBySession(sessionID: string): Promise<User | null> {
        if (sessionID != undefined) return await this.userInterface.getUserBySession(sessionID);
        return null;
    }
}
