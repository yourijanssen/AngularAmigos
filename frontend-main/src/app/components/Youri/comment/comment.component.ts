import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.css'],
})
export class CommentComponent {
    commentText!: string;
    commentBody = this.fb.group({
        commentInputField: [''],
    });

    clear() {
        this.commentText = '';
    }

    constructor(private commentService: CommentService, private fb: FormBuilder) {}

    postComment() {
        this.commentService.postComment(this.commentBody).subscribe({
            next: (data) => console.log(data),
            error: (error) => console.error(error),
            complete: () => console.log('Completed'),
        });
        setTimeout(() => {
            this.clear();
        }, 100);
        console.log(this.commentBody.value);
    }

    get commentInputField() {
        return this.commentBody.get('commentInputField');
    }
}
