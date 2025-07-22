import { Book } from "./book.model";
import { Review } from "./review.model";

export interface ReviewResponse {
    reviews: Review[],
    total: number,
    avg: number,
}
