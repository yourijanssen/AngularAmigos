/**
 * Our communication format "JSend".
 * @author Thijs van Rixoort
 */
export interface JSend<T> {
    status: string;
    data: { post: T };
}
