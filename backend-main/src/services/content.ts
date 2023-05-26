import { Content } from '../business/content';
import { ContentTag, TagType } from '../business/content-tag';
import { ContentInterface } from '../repository/interfaces/content-interface';

export class SDGTags {
    constructor(
        public id: number,
        public title: string,
        public text: string,
        public image: string,
        public createdAt: Date,
        public updatedAt: Date
    ) {}
}
export class SubjectTags {
    constructor(public id: number, public title: string, public description: string) {}
}

export class ContentTags {
    constructor(public id: number, public contentID: number, public sdgID: number, public subjectID: number) {}
}

export class ContentService {
    public constructor(private contentReposistory: ContentInterface) {}

    public async getContent(limit: number, offset: number): Promise<Content[] | null> {
        let content: Content[] | null = await this.contentReposistory.getContent(limit, offset);
        if (content !== null) {
            content = await this.getContentTags(content);
        }

        // console.log(content);
        return content;
    }

    public getContentLikes(): Promise<number> {
        return this.contentReposistory.getContentLikes();
    }

    /**
     * Get all the tags from the DB with the ID's
     * Convert the ID's to names
     * Add the names to the contentTags
     */
    private async getContentTags(content: Content[]): Promise<Content[]> {
        for (let i = 0; i < content.length; i++) {
            // console.log(content[i]);
            let contentTags: ContentTag[] | null = await this.contentReposistory.getContentTags(content[i].id);
            if (contentTags !== null) {
                // content[i].tags.sdgTitle = await this.contentReposistory.getSDGName(content[i].sdgID);
            }
            // await this.convertIDToName(content);
        }
        return content;
    }

    private async getSDGTagsObject(): Promise<SDGTags[]> {
        return await this.contentReposistory.getSDGTags();
    }

    private async getSubjectTagsObject(): Promise<SubjectTags[]> {
        return await this.contentReposistory.getSubjectTags();
    }

    private async getContentTagsObject(): Promise<ContentTags[]> {
        return await this.contentReposistory.getContentTagIDs();
    }

    private async convertIDToName(content: Content[]): Promise<Content[]> {
        // console.log('Content before: ', content);
        let subjectTags: SubjectTags[] = await this.getSubjectTagsObject();
        let contentTags: ContentTags[] = await this.getContentTagsObject();
        for (let i = 0; i < content.length; i++) {
            if (content[i].id == contentTags[i].contentID) {
                content[i].tags.push(await this.findSDGName(contentTags[i].sdgID));
                console.log('Content: ', content[i]);
            }
            if (content[i].id == subjectTags[i].id) {
                content[i].tags.unshift(subjectTags[i].title);
            }
        }
        return content;
    }

    private async findSDGName(id: number): Promise<string> {
        let sdgTags: SDGTags[] = await this.getSDGTagsObject();
        let title: string = '';
        for (let i = 0; i < sdgTags.length; i++) {
            if (sdgTags[i].id == id) {
                title = sdgTags[i].title;
            }
        }
        return title;
    }
}
