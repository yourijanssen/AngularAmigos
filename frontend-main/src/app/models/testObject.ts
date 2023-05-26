/**
 * Testobject interface to test connection between backend and frontend.
 * @author Thijs van Rixoort
 */
export interface Test {
    id: number;
    message: string;
}

export interface postContent {
    message: string;
}

export interface getSDG {
    id: number;
    title: string;
}

export interface getSubject {
    id: number;
    title: string;
}

export interface User {
    message: string;
}
