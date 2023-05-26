import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LikeService {
    private likes: any = new Map<number, number>();
    private likedPosts = new Set<number>();

    isLiked(postId: number): boolean {
        return this.likedPosts.has(postId);
    }

    likePost(postId: number) {
        this.likedPosts.add(postId);
        this.likes.set(postId, this.likes.get(postId) + 1 || 1);
    }

    unlikePost(postId: number) {
        this.likedPosts.delete(postId);
        this.likes.set(postId, this.likes.get(postId) - 1);
    }

    getLikeCount(postId: number): number {
        return this.likes.get(postId) || 0;
    }
}
