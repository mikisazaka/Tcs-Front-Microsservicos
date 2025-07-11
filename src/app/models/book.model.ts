export interface Book {
    id?: number;
    title: string;
    author: string;
    publishedYear: number;
    genre: string;
    pagesQuantity: number;
    contentRating: string;
    image: File | null;
}