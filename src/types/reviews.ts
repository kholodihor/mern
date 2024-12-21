export interface Review {
  name: string;
  rating: number;
  review: string;
  created_at: string;
  profile_photo: string;
  relative_time: string;
}

export interface ReviewsResponse {
  reviews: Review[];
  fetchedAt: Date;
}
