import { Book } from "./bookDetail.model";
import { Review } from "./review.model";

export interface BookReview {
    book: Book
    reviews: Review[]
}
