import { Book } from "./bookDetail.model"

export interface Review {
    userId: number
    bookId: number
    rating: number
    title: string
    comment: string
    username: string
    createdAt: string
    book?: Book
}
