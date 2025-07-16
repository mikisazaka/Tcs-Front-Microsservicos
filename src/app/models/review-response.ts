import { Review } from "./review.model";

export interface ReviewResponse {
    reviews: Review[],
    totalCount: number,
    avg: number,
}