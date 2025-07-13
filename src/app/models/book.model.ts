export interface Book {
    id?: number;
    title: string;
    author: string;
    publishedYear: number;
    gender: string;
    pagesQuantity: number;
    contentRating: string;
    image?: File;
    imagePath?: string;
}
