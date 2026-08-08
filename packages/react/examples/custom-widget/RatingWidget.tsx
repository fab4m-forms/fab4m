import * as React from "react";
import { WidgetProps } from "@fab4m/fab4m";

/**
 * A star rating widget. Mirrors the RatingWidget from the svelte
 * package testbed.
 */
export function RatingWidget(
  props: WidgetProps<number, unknown>,
): React.JSX.Element {
  const [rating, setRatingState] = React.useState(props.value ?? 0);
  const [hoverRating, setHoverRating] = React.useState(0);
  const setRating = (newRating: number) => {
    setRatingState(newRating);
    props.onChange(newRating);
  };
  const displayRating = hoverRating || rating;
  return (
    <div className="rating-widget">
      <label htmlFor={props.id}>{props.component.label}</label>
      {props.component.description ? (
        <p className="description">{props.component.description}</p>
      ) : null}
      <div
        className="stars"
        id={props.id}
        role="radiogroup"
        aria-label={props.component.label}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`star ${star <= displayRating ? "filled" : ""}`}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            aria-label={`${star} star${star > 1 ? "s" : ""}`}
            aria-checked={star === rating}
            role="radio"
          >
            {star <= displayRating ? "★" : "☆"}
          </button>
        ))}
      </div>
      <input type="hidden" name={props.name} value={rating} />
    </div>
  );
}
