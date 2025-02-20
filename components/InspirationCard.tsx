import React from "react";

interface InspirationCardProps {
  generatedAt?: string;
  title?: string;
  text?: string;
}

/**
 * A reusable "Inspiration of the day" card.
 * You can pass in optional props (generatedAt, title, text) or customize directly.
 */
export default function InspirationCard({
  generatedAt = "02/20/2025 - 9:34 AM",
  title = "Inspiration of the day!",
  text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Etiam eu turpis molestie, dictum est a, mattis tellus...`,
}: InspirationCardProps): JSX.Element {
  return (
    <div className="card p-3">
      <h5 className="card-title">{title}</h5>
      <small className="text-muted d-block mb-2">
        Generated at {generatedAt}
      </small>
      <p className="card-text">{text}</p>
    </div>
  );
}
