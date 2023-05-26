import { ContentTag } from './content-tag';

export class Content {
    public constructor(
        public id: number,
        public userID: number,
        public title: string,
        public text: string,
        public imagePath: string,
        public uploadDate: Date,
        public tags: string[]
    ) {}
}
