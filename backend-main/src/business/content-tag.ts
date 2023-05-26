export enum TagType {
    SDG = 'SDG',
    SUBJECT = 'SUBJECT',
}

export class ContentTag {
    public constructor(public id: number, public contentID: number, public sdgID: number, public subjectID?: number) {}

    public static getSubjectID(contentTags: ContentTag[], id: number): number | undefined {
        for (let i = 0; i < contentTags.length; i++) {
            if (id == contentTags[i].id && contentTags[i].subjectID !== undefined) {
                return contentTags[i].subjectID;
            }
        }
        return undefined;
    }

    // private convertIDToName(contentTags: ContentTag): string {}
}
