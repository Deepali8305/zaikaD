import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MENU } from "@/data/menu";
import { sendReviewToSheet } from "@/lib/google-sheets";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — Zaika Cloud Kitchen" },
      {
        name: "description",
        content: "Read and share reviews for Zaika Cloud Kitchen. Tell us about your experience!",
      },
      { property: "og:title", content: "Reviews — Zaika Cloud Kitchen" },
      {
        property: "og:description",
        content: "Share your experience with Zaika Cloud Kitchen.",
      },
    ],
  }),
  component: ReviewsPage,
});

type Review = {
  id: string;
  name: string;
  rating: number;
  foodItem: string;
  review: string;
  date: string;
};

const STORAGE_KEY = "zck-reviews";

function loadReviews(): Review[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Review[]) : [];
  } catch {
    return [];
  }
}

function saveReviews(reviews: Review[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
  } catch {
    /* ignore */
  }
}

function StarRating({
  value,
  onChange,
  readonly = false,
  size = "md",
}: {
  value: number;
  onChange?: (v: number) => void;
  readonly?: boolean;
  size?: "sm" | "md";
}) {
  const [hover, setHover] = useState(0);
  const sizeClass = size === "sm" ? "size-4" : "size-7";

  return (
    <div className="flex gap-0.5" role={readonly ? "img" : "radiogroup"} aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          className={`${readonly ? "cursor-default" : "cursor-pointer transition-transform hover:scale-110"}`}
          onMouseEnter={() => !readonly && setHover(star)}
          onMouseLeave={() => !readonly && setHover(0)}
          onClick={() => onChange?.(star)}
          aria-label={`${star} star${star > 1 ? "s" : ""}`}
        >
          <svg
            viewBox="0 0 24 24"
            className={sizeClass}
            fill={(hover || value) >= star ? "#f59e0b" : "none"}
            stroke={(hover || value) >= star ? "#f59e0b" : "currentColor"}
            strokeWidth="2"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </button>
      ))}
    </div>
  );
}

function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [foodItem, setFoodItem] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    setReviews(loadReviews());
    setHydrated(true);
  }, []);

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : "0";

  const ratingBreakdown = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
    percent: reviews.length > 0
      ? Math.round((reviews.filter((r) => r.rating === star).length / reviews.length) * 100)
      : 0,
  }));

  function validate(): string[] {
    const list: string[] = [];
    if (name.trim().length < 2) list.push("Please enter your name.");
    if (rating === 0) list.push("Please select a rating.");
    if (reviewText.trim().length < 5) list.push("Please write a review (at least 5 characters).");
    return list;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const list = validate();
    setErrors(list);
    if (list.length > 0) return;

    setSending(true);

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      name: name.trim(),
      rating,
      foodItem: foodItem || "General",
      review: reviewText.trim(),
      date: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    };

    // Save locally
    const updated = [newReview, ...reviews];
    setReviews(updated);
    saveReviews(updated);

    // Send to Google Sheet
    await sendReviewToSheet({
      name: newReview.name,
      rating: newReview.rating,
      foodItem: newReview.foodItem,
      review: newReview.review,
    });

    setSending(false);
    setSubmitted(true);
    setName("");
    setRating(0);
    setFoodItem("");
    setReviewText("");
  }

  return (
    <div className="container-page py-10 pb-28 md:pb-16">
      <header className="max-w-2xl">
        <h1 className="font-display text-3xl font-semibold sm:text-4xl">Customer Reviews</h1>
        <p className="mt-2 text-muted-foreground">
          See what our customers say about Zaika Cloud Kitchen, or share your own experience.
        </p>
      </header>

      {/* Stats Overview */}
      {hydrated && reviews.length > 0 && (
        <div className="mt-8 card-surface p-6">
          <div className="grid gap-6 sm:grid-cols-[auto_1fr]">
            <div className="text-center sm:pr-8 sm:border-r sm:border-border">
              <p className="font-display text-5xl font-bold">{avgRating}</p>
              <StarRating value={Math.round(Number(avgRating))} readonly size="sm" />
              <p className="mt-1 text-sm text-muted-foreground">{reviews.length} review{reviews.length !== 1 ? "s" : ""}</p>
            </div>
            <div className="space-y-1.5">
              {ratingBreakdown.map((b) => (
                <div key={b.star} className="flex items-center gap-2 text-sm">
                  <span className="w-8 text-right text-muted-foreground">{b.star}★</span>
                  <div className="flex-1 h-2.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-amber-400 transition-all"
                      style={{ width: `${b.percent}%` }}
                    />
                  </div>
                  <span className="w-8 text-xs text-muted-foreground">{b.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_24rem]">
        {/* Reviews List */}
        <div>
          <h2 className="font-display text-xl font-semibold">All Reviews</h2>
          {!hydrated ? (
            <div className="mt-4 space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="card-surface h-28 animate-pulse" />
              ))}
            </div>
          ) : reviews.length === 0 ? (
            <div className="card-surface mt-4 p-8 text-center">
              <p className="text-muted-foreground">No reviews yet. Be the first to share your experience!</p>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {reviews.map((rev) => (
                <article key={rev.id} className="card-surface p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground font-display text-sm font-bold">
                        {rev.name.charAt(0).toUpperCase()}
                      </span>
                      <div>
                        <p className="font-semibold">{rev.name}</p>
                        <p className="text-xs text-muted-foreground">{rev.date}</p>
                      </div>
                    </div>
                    <StarRating value={rev.rating} readonly size="sm" />
                  </div>
                  {rev.foodItem && rev.foodItem !== "General" && (
                    <p className="mt-2 inline-flex rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                      {rev.foodItem}
                    </p>
                  )}
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{rev.review}</p>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Review Form */}
        <aside>
          {submitted ? (
            <div className="card-surface flex flex-col items-center p-8 text-center">
              <span className="grid size-14 place-items-center rounded-full bg-primary/10 text-primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-7">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              <h2 className="mt-4 font-display text-xl font-semibold">Thank You!</h2>
              <p className="mt-2 text-sm text-muted-foreground">Your review has been submitted successfully.</p>
              <button
                type="button"
                className="btn-base btn-primary btn-primary-hover mt-5"
                onClick={() => setSubmitted(false)}
              >
                Write Another Review
              </button>
            </div>
          ) : (
            <div className="card-surface p-5 sticky top-20">
              <h2 className="font-display text-lg font-semibold">Write a Review</h2>
              <p className="mt-1 text-sm text-muted-foreground">Share your dining experience</p>

              <div className="mt-4 space-y-4">
                <div>
                  <label htmlFor="r-name" className="mb-1 block text-sm font-medium">
                    Your Name
                  </label>
                  <input
                    id="r-name"
                    className="field-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={80}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Your Rating</label>
                  <StarRating value={rating} onChange={setRating} />
                </div>

                <div>
                  <label htmlFor="r-food" className="mb-1 block text-sm font-medium">
                    Food Item (optional)
                  </label>
                  <select
                    id="r-food"
                    className="field-input"
                    value={foodItem}
                    onChange={(e) => setFoodItem(e.target.value)}
                  >
                    <option value="">General Review</option>
                    {MENU.map((item) => (
                      <option key={item.id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="r-review" className="mb-1 block text-sm font-medium">
                    Your Review
                  </label>
                  <textarea
                    id="r-review"
                    className="field-input min-h-28"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    maxLength={800}
                    placeholder="Tell us about your experience..."
                  />
                </div>

                {errors.length > 0 && (
                  <ul
                    role="alert"
                    className="space-y-1 rounded-2xl border border-destructive/40 bg-destructive/10 p-4 text-sm font-medium text-destructive"
                  >
                    {errors.map((err) => (
                      <li key={err}>{err}</li>
                    ))}
                  </ul>
                )}

                <button
                  type="button"
                  disabled={sending}
                  className="btn-base btn-primary btn-primary-hover w-full disabled:cursor-not-allowed disabled:opacity-60"
                  onClick={handleSubmit}
                >
                  {sending ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
