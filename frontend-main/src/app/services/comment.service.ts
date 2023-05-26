import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { JSend } from '../models/communication';
import { postContent } from '../models/testObject';

@Injectable({
    providedIn: 'root',
})
export class CommentService {
    private commentUrl = 'http://localhost:3000/comment';
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    constructor(private http: HttpClient) {}

    public postComment(
        comment: FormGroup<{
            commentInputField: FormControl<string | null>;
        }>
    ): Observable<JSend<postContent[]>> {
        const commentBody = {
            commentInputField: comment.get('commentInputField')?.value,
        };
        return this.http.post<JSend<postContent[]>>(this.commentUrl, commentBody, { withCredentials: true });
    }
}
