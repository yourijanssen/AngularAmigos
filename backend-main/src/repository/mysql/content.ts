/**
 * @author Lars Brinker
 */
import { Content } from '../../business/content';
import { ContentTag, TagType } from '../../business/content-tag';
import { ContentInterface } from '../interfaces/content-interface';
import { pool } from '../../util/mysql/mysql-database';
import * as mysql from 'mysql2/promise';
import { ContentTags, SDGTags, SubjectTags } from '../../services/content';

export class ContentMysql implements ContentInterface {
    public async getContent(limit: number, offset: number): Promise<Content[] | null> {
        let content: Content[] | null = null;
        await pool
            .query<mysql.RowDataPacket[]>('SELECT * FROM `content` ORDER BY id LIMIT ? OFFSET ?', [limit, offset])
            .then(([rows, fields]) => {
                if (rows != undefined && rows.length > 0) {
                    content = this.mysqlToContent(rows);
                }
            })
            .catch((error) => {
                console.log(error);
            });
        return content;
    }

    public async getContentLikes(): Promise<number> {
        let result: number = 0;
        await pool
            .query<mysql.RowDataPacket[]>('SELECT COUNT(*) FROM `content_likes`')
            .then(([rows, fields]) => {
                if (rows != undefined && rows.length > 0) {
                    result = rows[0]['COUNT(*)'];
                }
            })
            .catch((error) => {
                console.log(error);
            });
        return result;
    }

    public async getContentTags(id: number): Promise<ContentTag[] | null> {
        let contentTags = [] as ContentTag[];
        await pool
            .query<mysql.RowDataPacket[]>('SELECT * FROM `contenttags` WHERE contentID = ?', id)
            .then(([rows, fields]) => {
                if (rows != undefined && rows.length > 0) {
                    contentTags = this.mysqlToContentTag(rows);
                }
            })
            .catch((error) => {
                console.log(error);
            });
        return contentTags;
    }

    public async getSDGTags(): Promise<SDGTags[]> {
        let sdgTags = [] as SDGTags[];
        await pool
            .query<mysql.RowDataPacket[]>('SELECT * FROM `sdg`')
            .then(([rows, fields]) => {
                if (rows != undefined && rows.length > 0) {
                    sdgTags = this.mysqlToSDGTags(rows);
                }
            })
            .catch((error) => {
                console.log(error);
            });
        return sdgTags;
    }

    public async getSubjectTags(): Promise<SubjectTags[]> {
        let subjectTags = [] as SubjectTags[];
        await pool
            .query<mysql.RowDataPacket[]>('SELECT * FROM `subjectarea`')
            .then(([rows, fields]) => {
                if (rows != undefined && rows.length > 0) {
                    subjectTags = this.mysqlToSubjectTags(rows);
                }
            })
            .catch((error) => {
                console.log(error);
            });
        return subjectTags;
    }

    public async getContentTagIDs(): Promise<ContentTags[]> {
        let contentTags = [] as ContentTags[];
        await pool
            .query<mysql.RowDataPacket[]>('SELECT * FROM `contenttags`')
            .then(([rows, fields]) => {
                if (rows != undefined && rows.length > 0) {
                    contentTags = this.mysqlToContentTags(rows);
                }
            })
            .catch((error) => {
                console.log(error);
            });
        return contentTags;
    }

    public async getSDGName(id: number): Promise<string> {
        let sdgName: string = '';
        console.log(id);
        await pool
            .query<mysql.RowDataPacket[]>('SELECT * FROM `sdg` WHERE id = ?', id)
            .then(([rows, fields]) => {
                // for (let i = 0; i < rows.length; i++) {
                // sdgName[i] = rows[i]['title'];
                // }
                sdgName = rows[0]['title'];
            })
            .catch((error) => {
                console.log(error);
            });
        return sdgName;
    }

    public async getSubjectName(id: number): Promise<string> {
        let subjectName: string = '';
        await pool
            .query<mysql.RowDataPacket[]>('SELECT * FROM `subjectarea` WHERE id = ?', id)
            .then(([rows, fields]) => {
                // for (let i = 0; i < rows.length; i++) {
                //     subjectName[i] = rows[i]['title'];
                // }
                subjectName = rows[0]['title'];
            })
            .catch((error) => {
                console.log(error);
            });
        return subjectName;
    }

    private mysqlToContent(row: mysql.RowDataPacket[]): Content[] {
        let content = [] as Content[];
        for (let i = 0; i < row.length; i++) {
            let sdgSubjectName = [row[i]['subject'], row[i]['sdg']];
            content[i] = new Content(
                row[i]['id'],
                row[i]['userID'],
                row[i]['title'],
                row[i]['text'],
                row[i]['media'],
                row[i]['createdAt'],
                sdgSubjectName
            );
        }
        return content;
    }

    private mysqlToContentTag(row: mysql.RowDataPacket[]): ContentTag[] {
        let contentTag = [] as ContentTag[];
        for (let i = 0; i < row.length; i++) {
            contentTag[i] = new ContentTag(row[i]['id'], row[i]['contentID'], row[i]['sdgID'], row[i]['subjectID']);
        }
        return contentTag;
    }

    private mysqlToSDGTags(row: mysql.RowDataPacket[]): SDGTags[] {
        let sdgTags: SDGTags[] = [];
        for (let i = 0; i < row.length; i++) {
            const id = row[i]['id'];
            const title = row[i]['title'];
            const text = row[i]['text'];
            const image = row[i]['picture'];
            const createdAt = row[i]['createdAt'];
            const updatedAt = row[i]['updatedAt'];
            const sdgTag = new SDGTags(id, title, text, image, createdAt, updatedAt);
            sdgTags.push(sdgTag);
        }
        return sdgTags;
    }

    private mysqlToSubjectTags(row: mysql.RowDataPacket[]): SubjectTags[] {
        let subjectTags: SubjectTags[] = [];
        for (let i = 0; i < row.length; i++) {
            const id = row[i]['id'];
            const title = row[i]['title'];
            const description = row[i]['description'];
            const subjectTag = new SubjectTags(id, title, description);
            subjectTags.push(subjectTag);
        }
        return subjectTags;
    }

    private mysqlToContentTags(row: mysql.RowDataPacket[]): ContentTags[] {
        let contentTags: ContentTags[] = [];
        for (let i = 0; i < row.length; i++) {
            const id = row[i]['id'];
            const contentID = row[i]['contentID'];
            const sdgID = row[i]['sdgID'];
            const subjectID = row[i]['subjectID'];
            const contentTag = new ContentTags(id, contentID, sdgID, subjectID);
            contentTags.push(contentTag);
        }
        return contentTags;
    }
}
