import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { catchError, firstValueFrom, Observable, of, tap } from 'rxjs';
import { JSend } from '../models/communication';
import { getSDG, getSubject, postContent } from '../models/testObject';

@Injectable({
    providedIn: 'root',
})

/**
 * @author Youri Janssen
 * @description This service is used to GET and POST all the data that is related to uploading a project.
 */
export class UploadService {
    private postUrl = 'http://localhost:3000/upload';
    private SDGUrl = 'http://localhost:3000/upload/SDG';
    private subjectUrl = 'http://localhost:3000/upload/Subject';
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    constructor(private http: HttpClient) {}

    /**
     * @description Handles all errors that may occur in this class.
     */
    private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (error: any): Observable<T> => {
            console.log(`${operation} failed: ${error.message}`);

            return of(result as T);
        };
    }
    /**
     * @description Gets all the SDGs from the SDG URL.
     */
    public async getSDGs(): Promise<getSDG[]> {
        const response: JSend<getSDG[]> = await firstValueFrom<JSend<getSDG[]>>(
            this.http.get<JSend<getSDG[]>>(this.SDGUrl).pipe(
                tap((_) => console.log('Fetched SDG object')),
                catchError(this.handleError<JSend<getSDG[]>>('getSDG'))
            )
        );
        return response.data.post;
    }
    /**
     * @description Gets all the Subject from the subject URL.
     */
    public async getSubjects(): Promise<getSubject[]> {
        const response: JSend<getSubject[]> = await firstValueFrom<JSend<getSubject[]>>(
            this.http.get<JSend<getSubject[]>>(this.subjectUrl).pipe(
                tap((_) => console.log('Fetched Subject object')),
                catchError(this.handleError<JSend<getSubject[]>>('getSubject'))
            )
        );
        return response.data.post;
    }
    /**
     * @description Posts all the data from the upload form to the post URL.
     */
    public postUploadData(
        uploadForm: FormGroup<{
            contentTitle: FormControl<string | null>;
            contentText: FormControl<string | null>;
            contentMedia: FormControl<string | null>;
            dropdownSDG: FormControl<string | null>;
            dropdownSubject: FormControl<string | null>;
        }>
    ): Observable<JSend<postContent[]>> {
        const body = {
            contentTitle: uploadForm.get('contentTitle')?.value,
            contentText: uploadForm.get('contentText')?.value,
            contentMedia: uploadForm.get('contentMedia')?.value,
            dropdownSDG: uploadForm.get('dropdownSDG')?.value,
            dropdownSubject: uploadForm.get('dropdownSubject')?.value,
        };
        return this.http.post<JSend<postContent[]>>(this.postUrl, body, { withCredentials: true });
    }
}
