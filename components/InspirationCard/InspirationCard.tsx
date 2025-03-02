import React, {JSX} from "react";
import LoadingIndicator from "@/components/LoadingIndicator/LoadingIndicator";

interface InspirationCardProps {
  generatedAt?: Date;
  title?: string;
  text?: string;
  loading?: boolean;
}

function formatDateTime(date: Date): string {
    const pad = (num: number) => num.toString().padStart(2, '0');

    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1); // Months are 0-based
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = pad(date.getMinutes());

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'

    const formattedDate = `${day}/${month}/${year}`;
    const formattedTime = `${hours}:${minutes} ${ampm}`;

    return `${formattedDate} - ${formattedTime}`;
}
/**
 * A reusable "Inspiration of the day" card.
 * You can pass in optional props (generatedAt, title, text) or customize directly.
 */
export default function InspirationCard({
  generatedAt = new Date(),
  title = "Inspiration of the day!",
  text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Etiam eu turpis molestie, dictum est a, mattis tellus...`,
  loading = false,
}: InspirationCardProps): JSX.Element {
  if(loading) {
    return <LoadingIndicator />;
  }
  return (
    <div className="card p-2" style={{background: "#f2f4f5"}}>
        <div className="card-header d-flex justify-content-between align-items-center" style={{background: "#f2f4f5"}}>
            <h5 className="card-title mb-0">{title}</h5>
            <small className="text-muted">
                Generated at: {formatDateTime(generatedAt)}
            </small>
        </div>
        <p className="card-text mt-3" style={{marginLeft: "16px", marginRight: "16x"}}>{text}</p>
    </div>
  );
}
