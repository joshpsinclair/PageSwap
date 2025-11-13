export interface IBook {
    id: string;
    title: string;
    author: string;
    ownerId: string; // User.id
    genres: string[];
}  