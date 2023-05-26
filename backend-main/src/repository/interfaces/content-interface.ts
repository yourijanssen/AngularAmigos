/**
 * @author Lars Brinker
 */

import { Content } from '../../business/content';
import { ContentTag } from '../../business/content-tag';
import { ContentTags, SDGTags, SubjectTags } from '../../services/content';

export interface ContentInterface {
    getContent(limit: number, offset: number): Promise<Content[] | null>;
    getContentLikes(): Promise<number>;
    getContentTags(id: number): Promise<ContentTag[] | null>;
    getSDGName(id: number): Promise<string>;
    getSubjectName(id: number): Promise<string>;
    getSDGTags(): Promise<SDGTags[]>;
    getSubjectTags(): Promise<SubjectTags[]>;
    getContentTagIDs(): Promise<ContentTags[]>;
}
