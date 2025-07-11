export interface Book {
    id?: number;
    title: string;
    author: string;
    publishedYear: number;
    gender: string;
    pagesQuantity: string;
    contentRating: string;
    image?: File;
}