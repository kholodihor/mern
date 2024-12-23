import { NextResponse } from "next/server";
import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

// Cache duration in milliseconds (24 hours)
const CACHE_DURATION = 24 * 60 * 60 * 1000;

export async function GET() {
  try {
    // First try to get cached reviews from Firestore
    const reviewsRef = collection(db, "reviews");
    const q = query(reviewsRef, orderBy("fetchedAt", "desc"), limit(1));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const cachedData = snapshot.docs[0].data();
      const cacheTime = cachedData.fetchedAt.toDate();

      // If cache is less than 24 hours old, use it
      if (Date.now() - cacheTime.getTime() < CACHE_DURATION) {
        return NextResponse.json({
          reviews: cachedData.reviews,
          totalReviews: cachedData.totalReviews,
        });
      }
    }

    // If no cache or cache is old, fetch from Google Places API
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?` +
        `place_id=${process.env.GOOGLE_PLACE_ID}&` +
        `fields=reviews,rating,user_ratings_total&` +
        `language=pl&` +
        `key=${process.env.GOOGLE_PLACES_API_KEY}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Google Places API error: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.result) {
      throw new Error("No data found in the API response");
    }

    // Transform the reviews data to match existing structure
    const reviews = (data.result.reviews || [])
      .filter((review: any) => review.text && review.text.trim() !== "")
      .map((review: any) => ({
        name: review.author_name,
        rating: review.rating,
        review: review.text,
        created_at: new Date(review.time * 1000).toISOString(),
      }));

    const totalReviews = data.result.user_ratings_total;

    // Cache the reviews in Firestore
    await addDoc(reviewsRef, {
      reviews,
      totalReviews,
      fetchedAt: new Date(),
    });

    return NextResponse.json({
      reviews,
      totalReviews,
    });
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}
