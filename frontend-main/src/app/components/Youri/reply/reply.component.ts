import { Component, Input, OnInit } from '@angular/core';
import { LikeService } from 'src/app/services/like.service';

@Component({
    selector: 'app-reply',
    templateUrl: './reply.component.html',
    styleUrls: ['./reply.component.css'],
})
export class ReplyComponent implements OnInit {
    replyText!: string;
    ReplyText = 'Reply 🡇';
    RepliesText = 'Replies 🡇';

    clear() {
        this.replyText = '';
    }

    @Input()
    public submitReplies = false;
    public submitReply = false;
    postId!: number;
    isLiked!: boolean;
    likeCount!: number;
    isReplyOn = false;
    isRepliesOn = false;
    ReplyOn = 'Reply 🡅';
    ReplyOff = 'Reply 🡇';

    RepliesOn = 'Replies 🡅';
    RepliesOff = 'Replies 🡇';

    updateReplyTitle() {
        if (this.isReplyOn) {
            this.ReplyText = this.ReplyOn;
        } else {
            this.ReplyText = this.ReplyOff;
        }
    }

    updateRepliesTitle() {
        if (this.isRepliesOn) {
            this.RepliesText = this.RepliesOn;
        } else {
            this.RepliesText = this.RepliesOff;
        }
    }

    likeOrUnlike() {
        if (this.isLiked) {
            this.likeService.unlikePost(this.postId);
            this.likeCount--;
        } else {
            this.likeService.likePost(this.postId);
            this.likeCount++;
        }
        this.isLiked = !this.isLiked;
    }
    openReplies() {
        this.submitReplies = !this.submitReplies;
    }

    openReply() {
        this.submitReply = !this.submitReply;
    }

    constructor(private likeService: LikeService) {}

    ngOnInit() {
        // retrieve initial like data from the service
        this.isLiked = this.likeService.isLiked(this.postId);
        this.likeCount = this.likeService.getLikeCount(this.postId);
    }
}
