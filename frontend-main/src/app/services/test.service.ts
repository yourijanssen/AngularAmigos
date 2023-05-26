/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, Observable, of, tap } from 'rxjs';
import { JSend } from '../models/communication';
import { Test } from '../models/testObject';

@Injectable({
    providedIn: 'root',
})
export class TestService {
    private testUrl = 'http://localhost:3000/test/';
    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    public constructor(private http: HttpClient) {}

    /**
     * This method handles errors from network requests.
     * @param operation The method that fails.
     * @param result The result.
     * @returns a function that logs
     * @author Thijs van Rixoort
     */
    private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
        return (error: any): Observable<T> => {
            console.log(`${operation} failed: ${error.message}`);

            return of(result as T);
        };
    }

    /**
     * Fetches a test object from the backend
     * @returns the test object that was fetched if it was fetched succesfull.
     * @author Thijs van Rixoort
     */
    public async getTest(): Promise<Test> {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const response: JSend<Test[]> = await firstValueFrom<JSend<Test[]>>(
            this.http.get<JSend<Test[]>>(this.testUrl).pipe(
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                tap((_) => console.log('Fetched test object')), // This is obviously not production code, just a console log to show that it works.
                catchError(this.handleError<JSend<Test[]>>('getTest')) // logs the error in the console for now.
            )
        );

        return response.data.post[0];
    }
}
