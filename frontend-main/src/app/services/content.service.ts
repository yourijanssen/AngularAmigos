import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { JSend } from '../models/communication';
import { Content } from '../models/content';

@Injectable({
    providedIn: 'root',
})
export class ContentService {
    private url = 'http://localhost:3000/posts';
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    constructor(private http: HttpClient) {}

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.log(`${operation} failed: ${error.message}`);

            return of(result as T);
        };
    }

    public getContent(limit: number, offset: number): Observable<JSend<Content[]>> {
        return this.http.get<JSend<Content[]>>(`${this.url}?limit=${limit}&offset=${offset}`).pipe(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            tap((_) => console.log('fetched content')),
            catchError(this.handleError<JSend<Content[]>>('getContent', { status: 'fail', data: { post: [] } }))
        );
    }
}
