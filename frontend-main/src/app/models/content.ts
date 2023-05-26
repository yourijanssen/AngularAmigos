/**
 * The Content model.
 * @author Thijs van Rixoort
 */

export interface Content {
    id: number;
    userID: number;
    title: string;
    text: string;
    tags: string[];
    uploadDate: string;
    imagePath: string;
}
