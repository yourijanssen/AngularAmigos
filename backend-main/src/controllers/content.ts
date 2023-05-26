import { Request, Response } from 'express';
import { ContentService } from '../services/content';

export class ContentController {
    public constructor(private contentService: ContentService) {}

    public async getContent(request: Request, response: Response): Promise<void> {
        if (request.query.limit !== undefined && request.query.offset !== undefined) {
            let offset: number = parseInt(request.query.offset!.toString());
            let limit: number = parseInt(request.query.limit!.toString());

            let content = await this.contentService.getContent(limit, offset);
            if (content === null) {
                response.status(404).json({ status: 'error', message: 'No content found' });
            } else {
                response.status(200).json({ status: 'succes', data: { post: content } });
            }
        }
    }
}
