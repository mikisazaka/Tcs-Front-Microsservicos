import { Book } from "./bookDetail.model"

export interface Review {
    reviewId: number
    userId: number
    bookId: number
    rating: number
    title: string
    comment: string
    username: string
    createdAt: string
    book?: Book
}
